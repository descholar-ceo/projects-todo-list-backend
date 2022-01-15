/* eslint-disable require-jsdoc */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/index';
import { RESOURCE_NOT_FOUND, WELCOME_MESSAGE } from '../../src/utils/custom-messages.util';
import { NOT_FOUND, OK } from '../../src/utils/status-codes.util';

chai.use(chaiHttp);
chai.should();

describe('Welcome route', () => {
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
