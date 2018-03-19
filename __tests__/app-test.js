const request = require('supertest');

const {
  app,
} = require('../src/app.js');

/* describe('Test the root path', () => {
  test('It should response the GET method', () => {
    request(app).get('/').expect(200);
  });
}); */

describe('Root Path', () => {
  test('response to get', () => {
    return request(app).get("/").then((Response) => {
      expect(Response.statusCode).toBe(200);
    });
  });
});