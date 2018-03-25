const {
  stringCheck,
  hasNameAndIngredient,
} = require('../src/validation.js');

describe('successfully validates meal input', () => {
  it('returns a message if an input is not a string', () => {
    const input = 56;
    const result = stringCheck(input);
    expect(result).toContain('Input Is Not A String');
  });
  it('Returns string if input is a string', () => {
    const input = 'cheese';
    const result = stringCheck(input);
    expect(result).toContain('cheese');
  });
  it('sends a response if input is less than 2 characters', () => {
    const input = 'A';
    const result = stringCheck(input);
    expect(result).toContain('Please write more than one character for the name');
  });
  it('returns object if it contains meal name and ingredient', () => {
    const input = {
      name: 'Cheeseburger',
      ingredients: ['cheese'],
    };
    const result = hasNameAndIngredient(input);
    expect(result).toMatchObject(input);
  });
  it('returns error message if t is missing a name', () => {
    const input = {
      ingredients: ['cheese'],
    };
    const result = hasNameAndIngredient(input);
    expect(result).toContain('Meal name is required');
  });
  it('returns error message if it is missing ingredients', () => {
    const input = {
      name: 'Cheeseburger',
    };
    const result = hasNameAndIngredient(input);
    expect(result).toContain('Meal ingredients are required');
  });
  xit('ingredient should be in the form of an array', () => {
    const ingredient = 'cheese';
    const result = validation(ingredient);
    expect(result).toBe(['cheese']);
  });
});
