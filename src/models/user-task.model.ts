import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserTask extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  registrationId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserTask>) {
    super(data);
  }
}

export interface UserTaskRelations {
  // describe navigational properties here
}

export type UserTaskWithRelations = UserTask & UserTaskRelations;
