require('isomorphic-fetch');

const checkForErrors = (response) => {
  if (response.status >= 400) {
    // console.log(response);
    throw new Error('Bad response from server');
  }
  return response;
};

const noErrorResponse = response => response.json();

// move fetches into client into api and then rename api to data -
const getScheduleFromEndpoint = () =>
  fetch('/schedule')
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
