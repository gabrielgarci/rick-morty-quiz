import { FormValidation, Validator } from '../../models';
import { getFieldError, getFormErrors } from './form-errors';

describe('Form Errors', () => {
  describe('getFieldError', () => {
    it('should return undefined if no validator is defined', () => {
      const value = 'some';
      const result = getFieldError(value);
      expect(result).toBeUndefined();
    });
    it('should return error message with default value', () => {
      const value = 'Jo';
      const defaultMessage = 'Invalid value';
      const validators: Validator<string>[] = [
        {
          func: (val: string) => val.length > 5,
        },
      ];
      const result = getFieldError(value, validators);
      expect(result).toBe(defaultMessage);
    });
    it('should return error message with custom value', () => {
      const value = 'Jo';
      const customMessage = 'Some awesome message';
      const validators: Validator<string>[] = [
        {
          func: (val: string) => val.length > 5,
          message: customMessage,
        },
      ];
      const result = getFieldError(value, validators);
      expect(result).toBe(customMessage);
    });
    it('should return error message from first fail validation', () => {
      const value = 'Jo';
      const expectedMessage = 'First validation message';
      const validators: Validator<string>[] = [
        {
          func: (val: string) => val.length > 5,
          message: expectedMessage,
        },
        {
          func: (val: string) => val.length > 8,
        },
      ];
      const result = getFieldError(value, validators);
      expect(result).toBe(expectedMessage);
    });
    it('should return undefined if value satisfy validation', () => {
      const value = 'Jo Nesbo';
      const validators: Validator<string>[] = [
        {
          func: (val: string) => val.length > 5,
        },
      ];
      const result = getFieldError(value, validators);
      expect(result).toBeUndefined();
    });
  });
  describe('getFormErrors', () => {
    it('should return error messages', () => {
      type Mock = {
        a: string;
        b: string;
      };

      const values: Mock = {
        a: 'a',
        b: 'b',
      };

      const validators: FormValidation<Mock> = {
        a: [
          {
            func: (val: string) => val === 'c',
          },
        ],
      };

      const expectedResult = {
        a: 'Invalid value',
      };

      const result = getFormErrors(values, validators);

      expect(result).toEqual(expectedResult);
    });
  });
});
