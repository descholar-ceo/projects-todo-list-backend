/* eslint-disable require-jsdoc */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/index';
import ProjectService from '../../src/services/project.service';
import { RESOURCE_CREATED, RESOURCE_FAILED_TO_DELETED, RESOURCE_FAILED_TO_UPDATE, RESOURCE_NOT_FOUND, RESOURCE_RETRIEVED, RESOURCE_UPDATED, RESOURCE_WAS_DELETED } from '../../src/utils/custom-messages.util';
import { CREATED, NOT_FOUND, OK } from '../../src/utils/status-codes.util';
import { createProject1ValidData, createProject2ValidData, createProject3ValidData, createProject4ValidData, createProject5ValidData, updateProject2ValidData } from '../mock/project.mock';

chai.use(chaiHttp);
chai.should();

describe('Project CRUD', () => {
  it('Should return 201 if project is created', (done) => {
    chai
      .request(server)
      .post('/api/v1/projects')
      .send(createProject1ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_CREATED);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Should return 200 if project is updated', async () => {
    const projectService = new ProjectService();
    const { dataValues: { id } } = await projectService.saveAll(createProject2ValidData);
    chai
      .request(server)
      .patch(`/api/v1/projects/${id}`)
      .send(updateProject2ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_UPDATED);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('Should return 404 if project is NOT updated', (done) => {
    chai
      .request(server)
      .patch('/api/v1/projects/55664')
      .send(updateProject2ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_FAILED_TO_UPDATE);
        done();
      });
  });

  it('Should return 200 if project is deleted', async () => {
    const projectService = new ProjectService();
    const { dataValues: { id } } = await projectService.saveAll(createProject3ValidData);
    chai
      .request(server)
      .delete(`/api/v1/projects/${id}`)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_WAS_DELETED);
      });
  });

  it('Should return 404 if project is NOT deleted', (done) => {
    chai
      .request(server)
      .delete('/api/v1/projects/223345')
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_FAILED_TO_DELETED);
        done();
      });
  });

  it('Should return 200 if projects are retrieved', async () => {
    const projectService = new ProjectService();
    await projectService.saveAll(createProject4ValidData);
    chai
      .request(server)
      .get('/api/v1/projects')
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_RETRIEVED);
      });
  });

  it('Should return 200 if projects are retrieved', async () => {
    const projectService = new ProjectService();
    await projectService.saveAll(createProject5ValidData);
    chai
      .request(server)
      .get(`/api/v1/projects?name=${createProject5ValidData.name}&page=1&limit=2`)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_RETRIEVED);
      });
  });

  it('Should return 200 if projects are retrieved', (done) => {
    chai
      .request(server)
      .get('/api/v1/projects?name=people&page=10&limit=200')
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_NOT_FOUND);
        done();
      });
  });
});
