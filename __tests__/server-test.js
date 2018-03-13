const request = require('supertest');

const getSomething = require('../src/server.js');

xdescribe('Bunny', () => {
  test('Id est', () => {
    expect(getSomething).toBe(getSomething);
  });
});
