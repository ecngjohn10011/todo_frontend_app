export const todoValidationRules = {
  required: true,
  minLength: {
    value: 3,
    message: "Todo cannot be less than 3 characters.",
  },
  maxLength: {
    value: 128,
    message: "Todo cannot be more than 128 characters.",
  },
};
