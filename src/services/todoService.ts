'use strict';

import TodoRepositroy from '../repositories/todoRepository';

class TodoService {
  private readonly repository: TodoRepositroy;

  constructor(repository: TodoRepositroy) {
    this.repository = repository;
  }
}

export default TodoService;
