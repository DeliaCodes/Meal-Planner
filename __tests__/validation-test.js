const {
  stringCheck,
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
  xit('ingredient should be in the form of an array', () => {
    const ingredient = 'cheese';
    const result = validation(ingredient);
    expect(result).toBe(['cheese']);
  });
});
