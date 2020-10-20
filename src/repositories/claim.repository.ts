import {DefaultCrudRepository} from '@loopback/repository';
import {Claim, ClaimRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClaimRepository extends DefaultCrudRepository<
  Claim,
  typeof Claim.prototype.id,
  ClaimRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Claim, dataSource);
  }
}
