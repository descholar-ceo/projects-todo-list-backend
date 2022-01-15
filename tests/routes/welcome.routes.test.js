/* eslint-disable require-jsdoc */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/index';
import ProjectService from '../../src/services/project.service';
import { RESOURCE_CREATED, RESOURCE_NOT_FOUND, RESOURCE_RETRIEVED, RESOURCE_UPDATED, RESOURCE_WAS_DELETED, WELCOME_MESSAGE } from '../../src/utils/custom-messages.util';
import { CREATED, NOT_FOUND, OK } from '../../src/utils/status-codes.util';
import { createProject1ValidData, createProject2ValidData, createProject3ValidData, createProject4ValidData, createProject5ValidData, updateProject2ValidData } from '../mock/project.mock';

chai.use(chaiHttp);
chai.should();

describe('User sign up', () => {
  it('Should return 200 if we visit a welcome page', (done) => {
    chai
      .request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(WELCOME_MESSAGE);
        done();
      });
  });
  it('Should return 200 if we visit a welcome page', (done) => {
    chai
      .request(server)
      .get('/notfoundroute')
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_NOT_FOUND);
        done();
      });
  });
});
