const validation = require('../src/validation');

describe('successfully validates meal input', () => {
  it('errors out if an input is not a string', () => {
    const input = 56;
    const result = validation(input);
    expect(result).toContain('error');
  });
  it('sends a response if input is less than 2 characters', () => {
    const input = 'A';
    const result = validation(input);
    expect(result).toContain('Please write more than two characters for the name');
  });
});
