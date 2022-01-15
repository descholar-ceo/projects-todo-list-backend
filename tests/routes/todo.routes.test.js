/* eslint-disable require-jsdoc */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/index';
import TodoService from '../../src/services/todo.service';
import { RESOURCE_CREATED, RESOURCE_FAILED_TO_DELETED, RESOURCE_FAILED_TO_UPDATE, RESOURCE_NOT_FOUND, RESOURCE_RETRIEVED, RESOURCE_UPDATED, RESOURCE_WAS_DELETED } from '../../src/utils/custom-messages.util';
import { CREATED, NOT_FOUND, OK } from '../../src/utils/status-codes.util';
import { createTodo1ValidData, createTodo2ValidData, createTodo3ValidData, createTodo4ValidData, createTodo5ValidData, updateTodo2ValidData } from '../mock/todo.mock';

chai.use(chaiHttp);
chai.should();

describe('Todo CRUD', () => {
  it('Should return 201 if todo is created', (done) => {
    chai
      .request(server)
      .post('/api/v1/todos')
      .send(createTodo1ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_CREATED);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Should return 200 if todo is updated', async () => {
    const todoService = new TodoService();
    const { dataValues: { id } } = await todoService.saveAll(createTodo2ValidData);
    chai
      .request(server)
      .patch(`/api/v1/todos/${id}`)
      .send(updateTodo2ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_UPDATED);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('Should return 404 if todo is NOT updated', (done) => {
    chai
      .request(server)
      .patch('/api/v1/todos/55664')
      .send(updateTodo2ValidData)
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_FAILED_TO_UPDATE);
        done();
      });
  });

  it('Should return 200 if todo is deleted', async () => {
    const todoService = new TodoService();
    const { dataValues: { id } } = await todoService.saveAll(createTodo3ValidData);
    chai
      .request(server)
      .delete(`/api/v1/todos/${id}`)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_WAS_DELETED);
      });
  });

  it('Should return 404 if todo is NOT deleted', (done) => {
    chai
      .request(server)
      .delete('/api/v1/todos/223345')
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_FAILED_TO_DELETED);
        done();
      });
  });

  it('Should return 200 if todos are retrieved', async () => {
    const todoService = new TodoService();
    await todoService.saveAll(createTodo4ValidData);
    chai
      .request(server)
      .get('/api/v1/todos')
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_RETRIEVED);
      });
  });

  it('Should return 200 if todos are retrieved', async () => {
    const todoService = new TodoService();
    await todoService.saveAll(createTodo5ValidData);
    chai
      .request(server)
      .get(`/api/v1/todos?name=${createTodo5ValidData.name}&page=1&limit=2`)
      .end((err, res) => {
        expect(res.status).to.equal(OK);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_RETRIEVED);
      });
  });

  it('Should return 404 unless todos are retrieved', (done) => {
    chai
      .request(server)
      .get('/api/v1/todos?title=people&page=10&limit=200')
      .end((err, res) => {
        expect(res.status).to.equal(NOT_FOUND);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string').to.equal(RESOURCE_NOT_FOUND);
        done();
      });
  });
});
