import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Claim extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;
  
  @property({
    type: 'string',
  })
  inwardId: string;
  
  @property({
    type: 'string',
  })
  memberId?: string;
  
  @property({
    type: 'string',
  })
  policyNumber?: string;
  
  @property({
    type: 'string',
  })
  claimedAmount?: string;
  
  @property({
    type: 'string',
  })
  approvedAmount?: string;
  
  @property({
    type: 'string',
  })
  status?: string;
  
  @property({
    type: 'string',
  })
  subStatus?: string;
  
  // Define well-known properties here
  
  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
  
  constructor(data?: Partial<Claim>) {
    super(data);
  }
}

export interface ClaimRelations {
  // describe navigational properties here
}

export type ClaimWithRelations = Claim & ClaimRelations;
