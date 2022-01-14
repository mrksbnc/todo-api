'use strict';

import Database from './database';
import tododeckDbContext from './contexts/tododeckDbContext';

const database = new Database({ context: tododeckDbContext });

export default database;
