import {BindingScope, injectable} from '@loopback/core';

import {Duration, ZBClient} from "zeebe-node";
import {Claim, RegistrationRequest, UserTask} from "../models";
import {repository} from "@loopback/repository";
import {UserTaskRepository} from "../repositories";

@injectable({scope: BindingScope.TRANSIENT})
export class ZeebeService {
  zbc: ZBClient;
  
  constructor(@repository(UserTaskRepository) protected userTaskRepository: UserTaskRepository) {
    this.zbc = new ZBClient(process.env.ZEEBE_URL ?? 'localhost:26500');
    this.zbc.createWorker('assign_to_deo', (job, complete, worker) => this.assignToDeoHandler(job, complete, worker, userTaskRepository));
    this.zbc.createWorker('task_completed', (job, complete, worker) => this.taskCompletionHandler(job, complete, worker, userTaskRepository));
    this.zbc.createWorker('assign_to_medical_adjudication', (job, complete, worker) => this.assignToMedicalAdjudication(job, complete, worker, userTaskRepository));
  }
  
  async deployWorkflow() {
    console.log("Deploying workflow...");
    return this.zbc.deployWorkflow('./workflow/registrationWF.bpmn');
  }
  
  async startPreAuthRegistrationWorkflow(registrationRequest: RegistrationRequest) {
    const result = await this.zbc.createWorkflowInstance('preauth_registration', {
      ...registrationRequest,
      inwardId: registrationRequest.id
    });
    console.log(result)
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignToDeoHandler(job: any, complete: any, worker: any, userTaskRepository: UserTaskRepository) {
    console.log('Task variables', job.variables);
    
    userTaskRepository.create(new UserTask({inwardId: job.variables.id, userId: 'deo_1', status: 'in_progress'}))
      .then(res => {
        // Add task id to context
        const updateToBrokerVariables = {
          taskId: res.id,
        };
        complete.success(updateToBrokerVariables);
      })
      .catch(err => {
        console.log(err)
      })
    
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskCompletionHandler(job: any, complete: any, worker: any, userTaskRepository: UserTaskRepository) {
    console.log('Task variables', job.variables);
    
    userTaskRepository.findById(job.variables.taskId)
      .then(res => {
        res.status = 'completed';
        userTaskRepository.update(res)
          .then(() => {
            complete.success();
          })
          .catch(err => {
            console.log(err)
          })
        
      })
      .catch(err => {
        console.log(err)
      })
    
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignToMedicalAdjudication(job: any, complete: any, worker: any, userTaskRepository: UserTaskRepository) {
    console.log('Task variables', job.variables);
    
    userTaskRepository.create(new UserTask({inwardId: job.variables.id, userId: 'ma_1', status: 'in_progress'}))
      .then(res => {
        // Add task id to context
        const updateToBrokerVariables = {
          taskId: res.id,
        };
        complete.success(updateToBrokerVariables);
      })
      .catch(err => {
        console.log(err)
      })
    
  }
  async publishClaimRegistered(claim: Claim) {
    await this.zbc.publishMessage({
      correlationKey: claim.inwardId,
      messageId: claim.inwardId,
      name: 'deo_registration_completion',
      variables: {claimId: claim.id, status: claim.status, subStatus: claim.subStatus},
      timeToLive: Duration.seconds.of(10), // seconds
    })
    
  }
}
