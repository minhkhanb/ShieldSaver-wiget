import validator from 'validator';
import INPUT_FIELDS from './fields.const';
import MESSAGES from './messages.const';

const validationResponse = {
  valid: true,
  errors: [],
};

const validate = (value, type, rules) => {
  if (!type && !rules) {
    if (value) {
      return {
        ...validationResponse,
        valid: true,
        errors: [],
      };
    }
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.REQUIRED,
      ],
    };
  }

  if (type === INPUT_FIELDS.EMAIL) {
    return validateEmail(value);
  }
  if (type === INPUT_FIELDS.EMAIL) {
    return validateEmail(value);
  }
};

const validateRequired = value => {
  if (!value) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.REQUIRED,
      ],
    };
  }
  return null;
};

const validateString = value => {
  if (!value || value.constructor !== String) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.INVALID,
      ],
    };
  }
  return null;
};

const validateStringLength = (value, min, max) => {
  if (min) {
    if (validateRequired(value)) {
      return validateRequired(value);
    }
  }
  if (validator.isLength(value, {min, max})) {
    return {
      ...validationResponse,
      valid: true,
      errors: [],
    };
  }
  return {
    ...validationResponse,
    valid: false,
    errors: [
      MESSAGES.INVALID,
    ],
  };
};

const validateZipLength = (value, min, max) => {
  if (validator.isLength(value, {min, max})) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.INVALID,
      ],
    };
  }
  return null;
};

const validateElmRequired = value => {
  if (validateRequired(value)) {
    return validateRequired(value);
  }
  return {
    ...validationResponse,
    valid: true,
    errors: [],
  };
};

const validateEmail = value => {
  if (validateRequired(value)) {
    return validateRequired(value);
  }
  if (validator.isEmail(value)) {
    return {
      ...validationResponse,
      valid: true,
      errors: [],
    };
  }
  return {
    ...validationResponse,
    valid: false,
    errors: [
      MESSAGES.INVALID,
    ],
  };
};

const validatePhone = value => {
  if (!value) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.REQUIRED,
      ],
    };
  }

  if (!(/[\(]\d{3}[\)][ ]\d{3}[\-]\d{4}/g).test(value)) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.INVALID,
      ],
    };
  }
  return {
    ...validationResponse,
    valid: true,
    errors: [],
  };
};

const validateZip = value => {
  if (!value) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.REQUIRED,
      ],
    };
  }

  if ((value.length < 5 || value.length > 5) && !(/\d{5}[\-]\d{4}/g).test(value)) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.INVALID,
      ],
    };
  }
  return {
    ...validationResponse,
    valid: true,
    errors: [],
  };
};

const validateSelectFieldRequired = value => {
  if (value === "default" || value === undefined) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.REQUIRED,
      ],
    };
  }
  return {
    ...validationResponse,
    valid: true,
    errors: [],
  };
};

const validateLicense = value => {
  if (validateRequired(value)) {
    return validateRequired(value);
  }

  if (!(/^[a-zA-Z0-9]+$/g).test(value)) {
    return {
      ...validationResponse,
      valid: false,
      errors: [
        MESSAGES.INVALID,
      ],
    };
  }
  return {
    ...validationResponse,
    valid: true,
    errors: [],
  };
};

export {
  INPUT_FIELDS,
  MESSAGES,
};

const validationHelper = {
  validate,
  validateElmRequired,
  validateEmail,
  validateZip,
  validatePhone,
  validateSelectFieldRequired,
  validateLicense,
};

export default validationHelper;
