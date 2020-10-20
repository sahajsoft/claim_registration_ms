// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {property, repository} from "@loopback/repository";
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {ClaimRepository} from "../repositories";
import {Claim} from "../models";
import {service} from "@loopback/core";
import {ZeebeService} from "../services";

export class ClaimController {
  constructor(
    @repository(ClaimRepository) protected claimRepository: ClaimRepository,
    @service(ZeebeService) protected zeebeService: ZeebeService
  ) {
  }
  
  @post('/claim', {
      responses: {
        '200': {
          description: 'Create claim with basic details',
          content: {'application/json': {schema: getModelSchemaRef(Claim)}}
        }
      }
    }
  )
  async createClaim(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Claim, {exclude: ['id']}),
        },
      },
    })
      claim: Claim
  ) {
    return this.claimRepository.create(claim)
      .then(res => {
        console.log(res);
        return this.zeebeService.publishClaimRegistered(claim);
      })
  }
}

