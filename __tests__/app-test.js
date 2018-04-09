import {TEST_DATABASE_URL,} from '../config.js';

const request = require('supertest');

const {
  runServer,
  closeServer,
} = require('../src/server.js');

const {
  app,
} = require('../src/app.js');

// run server and stop server

/* describe('Test the root path', () => {
  test('It should response the GET method', () => {
    request(app).get('/').expect(200);
  });
}); */


describe('Meal Endpoint Tests', () => {
  beforeAll(() => runServer(TEST_DATABASE_URL));

  afterAll(() => closeServer());

  describe('Root Path', () => {
    test('response to get', () => request(app).get('/').then((Response) => {
      expect(Response.statusCode).toBe(200);
    }));
  });

  test('GET - returns meals saved in db', () => request(app)
    .get('/meals')
    .then((Response) => {
      expect(Response.status).toBe(200);
      expect(Response.body).toBeDefined();
    }));

  test('POST - returns saved meal', () => request(app)
    .post('/meals')
    .send({
      name: 'cheeseburger',
      description: 'cheese, burger, and bun',
      dayOfWeek: 'Wednesday',
    }).then((Response) => {
      expect(Response.statusCode).toEqual(200);
      expect(Response.body.name).toEqual('cheeseburger');
      expect(Response.body.description).toContain('cheese');
      expect(Response.body.dayOfWeek).toEqual('Wednesday');
    }));
});
