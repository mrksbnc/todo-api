'use strict';

import TodoService from './todoService';
import UserService from './userService';
import repositories from '../repositories';
import CollectionService from './collectionService';
import { IServiceCollection } from '../data/interfaces/service';

const services: IServiceCollection = Object.freeze({
  user: new UserService({ repository: repositories.user }),
  todo: new TodoService({ repository: repositories.todo }),
  collection: new CollectionService({ repository: repositories.collection }),
});

export default services;
