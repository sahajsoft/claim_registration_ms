import {DefaultCrudRepository} from '@loopback/repository';
import {RegistrationRequest, RegistrationRequestRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegistrationRequestRepository extends DefaultCrudRepository<
  RegistrationRequest,
  typeof RegistrationRequest.prototype.id,
  RegistrationRequestRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RegistrationRequest, dataSource);
  }
}
