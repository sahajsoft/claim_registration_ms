import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class RegistrationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  subType: string;

  @property({
    type: 'string',
    required: true,
  })
  memberId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<RegistrationRequest>) {
    super(data);
  }
}

export interface RegistrationRequestRelations {
  // describe navigational properties here
}

export type RegistrationRequestWithRelations = RegistrationRequest & RegistrationRequestRelations;
