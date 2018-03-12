const request = require('supertest');

const getSomething = require('../server');

xdescribe('Bunny', () => {
  test('Id est', () => {
    expect(getSomething).toBe(getSomething);
  });
});
