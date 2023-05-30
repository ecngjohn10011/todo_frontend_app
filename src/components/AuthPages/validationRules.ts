export const usernameValidationRules = {
  required: true,
  minLength: {
    value: 6,
    message: "Username cannot be less than 6 characters.",
  },
  maxLength: {
    value: 30,
    message: "Username cannot be more than 30 characters.",
  },
};

export const passwordValidationRules = {
  required: true,
  minLength: {
    value: 2,
    message: "Password cannot be less than 2 characters.",
  },
  maxLength: {
    value: 30,
    message: "Password cannot be more than 30 characters.",
  },
};
