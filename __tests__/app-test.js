import mongoose from 'mongoose';
import {

  TEST_DATABASE_URL,

} from '../config';


const request = require('supertest');

const {
  runServer,
  closeServer,
} = require('../src/server.js');

const {
  app,
  sortMealData,
} = require('../src/app.js');

// run server and stop server

/* describe('Test the root path', () => {
  test('It should response the GET method', () => {
    request(app).get('/').expect(200);
  });
}); */

describe('Pure function tests', () => {
  it('succeeds in adding user data to week object', () => {
    const data = [{
      name: 'Something',
      dayOfWeek: '3',
    }];

    const result = {
      Sun: [],
      Mon: [],
      Tue: [],
      Wed: [{
        name: 'Something',
        dayOfWeek: '3',
      }],
      Thu: [],
      Fri: [],
      Sat: [],
    };
    expect(sortMealData(data)).toEqual(result);
  });
});

describe('Meal Endpoint Tests', () => {
  beforeAll(() => runServer(TEST_DATABASE_URL));

  beforeEach(() => mongoose.connection.db.dropDatabase());

  afterAll(() => closeServer());

  describe('Root Path', () => {
    test('response to get', () =>
      request(app)
      .get('/')
      .then((Response) => {
        expect(Response.statusCode).toBe(200);
      }));
  });

  test('GET - returns meals saved in db', () =>
    request(app)
    .get('/meals')
    .then((Response) => {
      pect(Response.status).toBe(200);
      epect(Response.body).toBeDefined();
    }));

  test('POST - returns saved meal', () =>
    request(app) ost('/meals')
    .end({
      name: 'cheeseburger',
      scription: 'cheese, burger, and bun',
      dyOfWeek: '3',
    })
    .tn((Response) => {
      epect(Response.statusCode).toEqual(200);
      expect(Response.body.name).toEqual('cheeseburger');
      pect(Response.body.description).toContain('cheese');
      epect(Response.body.dayOfWeek).toEqual('3');
    }));

  test('GET and POST - returns schedule', () => request(app)
    .post('/meals')
    .send({
      name: 'mince meat',
      description: 'a pie',
      dayOfWeek: '5',
    })
    .then(() =>
      request(app) et('/schedule'))
    .then((Response) => {
      expect(Response.body.Fri[0].name).toEqual('mince meat');
    }));
  test('DELETE', () => request(app)
    .post('/meals')
    .send({
      name: 'jellyfish sautee',
      description: 'brined',
    })
    .then(Response => request(app)
      .delete(`/meals/${Response.body._id}`)
      // .send(Response.body)
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(204);
      })));
});
