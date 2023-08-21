export const required = (value) => {
  return value ? true : "The field is requireds";
};
export const validateEmail = (value) => {
  if (value && value.includes("@")) {
    return true;
  }
  return "Invalid email format";
};
export const maxPasswordLength = (value) => {
  if (value && value.length <= 20 && value.length >= 8) {
    return true;
  }
  return "Password must be no longer than 20 and less than 8 characters";
};
