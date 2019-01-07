require('isomorphic-fetch');

const checkForErrors = (response) => {
  if (response.status >= 400) {
    // console.log(response);
    throw new Error('Bad response from server');
  }
  return response;
};

const noErrorResponse = response => response.json();

// add JWT that you get from your endpoints
// create auth end point, this changes user to not null

const user = null;
// user.name from server
// copy set into each one

const userEndpointLogin = user =>
  fetch('api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  })
    .then(checkForErrors)
    .then(noErrorResponse);

const userRefresh = user =>
  fetch('api/auth/refresh').set('Authorization', `Bearer ${user.authToken}`);

const userRegister = user =>
  fetch('api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    }),
  });

const getScheduleFromEndpoint = user =>
  fetch('/api/schedule')
    .set('Authorization', `Bearer ${user.authToken}`)
    .then(checkForErrors)
    .then(noErrorResponse);

const getMealsFromEndpoint = user =>
  fetch('/api/meals')
    .set('Authorization', `Bearer ${user.authToken}`)
    .then(checkForErrors)
    .then(noErrorResponse);

const deleteMealEndpoint = (id, user) =>
  fetch(`/api/meals/${id}`, {
    method: 'delete',
  })
    .set('Authorization', `Bearer ${user.authToken}`)
    .then(checkForErrors);

const sendMealToEndpoint = (data, user) =>
  fetch('/api/meals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .set('Authorization', `Bearer ${user.authToken}`)
    .then((response) => {
      if (response.status >= 400) {
        // console.log(response);
        throw new Error('Bad response from server');
      }
      return response.json();
    });

const updateMealEndpoint = (id, data, user) => {
  console.log('Update Data', data);

  return fetch(`/api/meals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  }).set('Authorization', `Bearer ${user.authToken}`);
};

module.exports = {
  getMealsFromEndpoint,
  updateMealEndpoint,
  sendMealToEndpoint,
  deleteMealEndpoint,
  getScheduleFromEndpoint,
  userEndpointLogin,
  userRefresh,
  userRegister,
};
