import chai from 'chai';
import sinonChai from 'sinon-chai';
import { sequelize, dataTypes, checkPropertyExists } from 'sequelize-test-helpers';
import ProjectModel from '../../src/database/models/project';

chai.use(sinonChai);

describe('model Project should be defined', () => {
  const Project = ProjectModel(sequelize, dataTypes);
  const projects = new Project();

  context('properties', () => {
    ['name'].forEach(checkPropertyExists(projects));
  });
});
