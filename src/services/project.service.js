import models from '../database/models';
import CrudRepository from '../database/crudRepo';

const { Project } = models;

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
  }
}
export default ProjectService;
