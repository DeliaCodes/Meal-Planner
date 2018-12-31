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

const getScheduleFromEndpoint = user =>
  fetch('/schedule').set('Authorization', `Bearer ${user.authToken}`)
    .then(checkForErrors)
    .then(noErrorResponse);

const getMealsFromEndpoint = () =>
  fetch('/meals')
    .then(checkForErrors)
    .then(noErrorResponse);

const deleteMealEndpoint = id =>
  fetch(`/meals/${id}`, {
    method: 'delete',
  }).then(checkForErrors);

const sendMealToEndpoint = data =>
  fetch('/meals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status >= 400) {
      // console.log(response);
      throw new Error('Bad response from server');
    }
    return response.json();
  });

const updateMealEndpoint = (id, data) => {
  console.log('Update Data', data);

  return fetch(`/meals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

module.exports = {
  getMealsFromEndpoint,
  updateMealEndpoint,
  sendMealToEndpoint,
  deleteMealEndpoint,
  getScheduleFromEndpoint,
};
