// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {service} from "@loopback/core";
import {ZeebeService} from "../services";
import {getModelSchemaRef, post} from "@loopback/openapi-v3";

export class ZeebeController {
  constructor(@service(ZeebeService) protected zeebeService: ZeebeService) {
  }
  
  @post('/workflow', {
    responses: {
      '200': {
        description: 'Upload workflow to zeebe'
      },
    },
  })
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createRegistrationRequest(): Promise<any> {
    return this.zeebeService.deployWorkflow()
  }
}
