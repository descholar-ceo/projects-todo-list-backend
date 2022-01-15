import models from '../database/models';
import CrudRepository from '../database/crudRepo';

const { Project, Todo } = models;

/**
 * @description class ProjectService handles everything regarding to project
 */
class ProjectService extends CrudRepository {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.model = Project;
    this.associateTable = [Todo];
  }
}
export default ProjectService;
