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

describe('Root Path', () => {
  test('response to get', () => request(app).get('/').then((Response) => {
    expect(Response.statusCode).toBe(200);
  }));
});

describe('Meal Tests', () => {
  beforeAll(() => runServer());

  afterAll(() => closeServer());

  test('returns saved meal - POST', () => {
    return request(app)
      .post('/meals')
      .send({
        name: 'cheeseburger',
        ingredients: ['cheese', 'burger'],
      }).then((Response) => {
        expect(Response.statusCode).toEqual(200);
        expect(Response.body.name).toEqual('cheeseburger');
        expect(Response.body.ingredients).toContain('cheese');
      });
  });
});
