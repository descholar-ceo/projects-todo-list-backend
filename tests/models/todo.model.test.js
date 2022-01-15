import chai from 'chai';
import sinonChai from 'sinon-chai';
import { sequelize, dataTypes, checkPropertyExists } from 'sequelize-test-helpers';
import TodoModel from '../../src/database/models/todo';

chai.use(sinonChai);

describe('model Project should be defined', () => {
  const Todo = TodoModel(sequelize, dataTypes);
  const todos = new Todo();

  context('properties', () => {
    ['title', 'description', 'dueDate', 'priority', 'completed', 'projectId'].forEach(checkPropertyExists(todos));
  });
});
