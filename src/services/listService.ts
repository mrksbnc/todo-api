'use strict';

import ListRepositroy from '../repositories/listRepository';

class ListService {
  private readonly repository: ListRepositroy;

  constructor(repository: ListRepositroy) {
    this.repository = repository;
  }
}

export default ListService;
