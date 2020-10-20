// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {repository} from "@loopback/repository";
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {RegistrationRequestRepository} from "../repositories";
import {RegistrationRequest} from "../models";
import {service} from "@loopback/core";
import {ZeebeService} from "../services";

export class RegistrationRequestController {
    constructor(@repository(RegistrationRequestRepository) protected registrationRequestRepository: RegistrationRequestRepository,
                @service(ZeebeService) protected zeebeService: ZeebeService) {
    }

    @post('/registration', {
        responses: {
            '200': {
                description: 'Recieve request to register PreAuth',
                content: {'application/json': {schema: getModelSchemaRef(RegistrationRequest)}},
            },
        },
    })
    async createRegistrationRequest(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(RegistrationRequest, {exclude: ['id']}),
                },
            },
        })
            request: RegistrationRequest
    ): Promise<RegistrationRequest> {
        return this.registrationRequestRepository.create(request)
          .then(async (res: RegistrationRequest) => {
              await this.zeebeService.startPreAuthRegistrationWorkflow(res);
              return res;
          })
    }
}
