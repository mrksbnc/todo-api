'use strict';

import AuthService from '../../services/authService';
import TodoService from '../../services/todoService';
import UserService from '../../services/userService';
import ProjectService from '../../services/projectService';

interface IServiceCollection {
  readonly auth: AuthService;
  readonly user: UserService;
  readonly todo: TodoService;
  readonly project: ProjectService;
}

export default IServiceCollection;
