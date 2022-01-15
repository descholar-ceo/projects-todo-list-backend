import models from '../database/models';
import CrudRepository from '../database/crudRepo';

const { Project, Todo } = models;

/**
 * @description class TodoService handles everything regarding to a todo
 */
class TodoService extends CrudRepository {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.model = Todo;
    this.associateTable = [Project];
  }
}
export default TodoService;
