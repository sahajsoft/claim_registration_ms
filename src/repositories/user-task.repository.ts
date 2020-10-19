import {DefaultCrudRepository} from '@loopback/repository';
import {UserTask, UserTaskRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserTaskRepository extends DefaultCrudRepository<
  UserTask,
  typeof UserTask.prototype.id,
  UserTaskRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UserTask, dataSource);
  }
}
