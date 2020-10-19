// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {Filter, repository} from "@loopback/repository";
import {UserTaskRepository} from "../repositories";
import {get, getModelSchemaRef, param,} from '@loopback/rest';
import {UserTask, UserTaskRelations} from "../models";

export class UserTaskController {
    constructor(@repository(UserTaskRepository) protected userTaskRepository: UserTaskRepository,) {
    }

    @get('/tasks/user/{userId}', {
        responses: {
            '200': {
                description: 'Get tasks for a user',
                content: {'application/json': {schema: getModelSchemaRef(UserTask)}},
            },
        },
    })
    async getTaskByUserId(
        @param.path.string('userId') userId: string,
    ): Promise<(UserTask & UserTaskRelations)[]> {
        const filter: Filter = {
            where: {
                'userId': userId
            }
        };
        return this.userTaskRepository.find(filter)
    }
}
