'use strict';

import ProjectRepositroy from '../../repositories/projectRepository';
import TodoRepositroy from '../../repositories/todoRepository';
import UserRepositroy from '../../repositories/userRepository';

interface IRepositoryCollection {
  readonly user: UserRepositroy;
  readonly todo: TodoRepositroy;
  readonly project: ProjectRepositroy;
}

export default IRepositoryCollection;
