// this is the file for your business logic. Rename once it is more than validation.

// should these be a try and catch block instead of an if / else?
const stringCheck = (mightBeAString) => {
  if (typeof mightBeAString === 'string' && mightBeAString.length > 1) {
    return mightBeAString;
  }
  return 'Input Is Not A String or is only one character. Please write more than one character for the name.';
};

// do I need this and the stringCheck?
const hasNameAndIngredient = (userContent) => {
  if (userContent.name !== undefined && userContent.description !== undefined) {
    return userContent;
  } else if (userContent.description !== undefined) {
    return 'Meal name is required';
  } else if (userContent.name !== undefined) {
    return 'Meal description is required';
  }
};
// do I need to do this for each value of the request body
/* const validateUserInput = (input) => {
  hasNameAndIngredient(input).then(stringCheck(input)).then(Promise.resolve(input));
}; */

// write something that will convert user input into what is needed by the database
// take input and convert it into an object with name: "" and description: []
/* const convertInputDataIntoDbFormat = (validateUserInput, userData) => {
  const formattedData = {
    description: [],
  };
  validateUserInput(userData.name).then(formattedData.name = userData.name);
  validateUserInput(userData.ingredient).then(formattedData.description.push(userData.ingredient));
  return formattedData;
}; */

module.exports = {
  stringCheck,
  hasNameAndIngredient,
};
