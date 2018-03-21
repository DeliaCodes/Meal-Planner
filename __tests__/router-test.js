const routes = require('../src/router');

describe('first route', () => {
  xit('status is as expected', () => {
    // set up data that you expect

    const request = '/';
    routes.post(request, response);

    // call function with data you're passing in

    // set up expected response
    expect(response).toBe(200);
  });
});
