const {
  stringCheck,
  hasNameAndDescription,
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
  it('returns object if it contains meal name and description', () => {
    const input = {
      name: 'Cheeseburger',
      description: ['cheese'],
    };
    const result = hasNameAndDescription(input);
    expect(result).toMatchObject(input);
  });
  it('returns error message if it is missing a name', () => {
    const input = {
      description: ['cheese'],
    };
    const result = hasNameAndDescription(input);
    expect(result).toContain('Meal name is required');
  });
  it('returns error message if it is missing description', () => {
    const input = {
      name: 'Cheeseburger',
    };
    const result = hasNameAndDescription(input);
    expect(result).toContain('Meal description is required');
  });
  xit('description should be in the form of an array', () => {
    const description = 'cheese';
    const result = validation(description);
    expect(result).toBe(['cheese']);
  });
});
