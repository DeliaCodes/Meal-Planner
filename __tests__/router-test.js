const routes = require('../src/router');

describe('first route', () => {
  it('status is as expected', () => {
    expect(routes.post.statusCode).toBe(200);
  });
});
