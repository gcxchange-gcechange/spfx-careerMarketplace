import { validateEmpty, validateDropdowns, validate, validateDuration } from './Validations';

describe('Validation Functions', () => {
  describe('validateEmpty', () => {
    it('should return error message for empty string', () => {
      const result = validateEmpty('', 'testField');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for undefined value', () => {
      const result = validateEmpty('', 'testField');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for value less than 5 characters', () => {
      const result = validateEmpty('abc', 'testField');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return undefined for valid value', () => {
      const result = validateEmpty('abcde', 'testField');
      expect(result).toBeUndefined();
    });
  });

  describe('validateDropdowns', () => {
    it('should return error message for empty string', () => {
      const result = validateDropdowns('');
      expect(result).not.toBeUndefined();
      expect(result).toBe('Please select an option2');
    });

    it('should return error message for value 0', () => {
      const result = validateDropdowns(0);
      expect(result).not.toBeUndefined();
      expect(result).toBe('Please select an option2');
    });

    it('should return undefined for valid value', () => {
      const result = validateDropdowns('option');
      expect(result).toBeUndefined();
    });
  });

  describe('validate', () => {
    it('should return error message for empty string', () => {
      const result = validate('');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for undefined value', () => {
      const result = validate(undefined);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for value 0', () => {
      const result = validate(0);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return undefined for valid value', () => {
      const result = validate('option');
      expect(result).toBeUndefined();
    });
  });

  describe('validateDuration', () => {
    it('should return error message for non-numeric value', () => {
      const result = validateDuration('abc');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for empty string', () => {
      const result = validateDuration('');
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for value less than minimum', () => {
      const result = validateDuration(-1);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return error message for value greater than maximum', () => {
      const result = validateDuration(37);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('type', 'div');
    });

    it('should return undefined for valid value', () => {
      const result = validateDuration(10);
      expect(result).toBeUndefined();
    });
  });
});
