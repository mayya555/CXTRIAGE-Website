export interface PasswordValidationResult {
  isValid: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isMinLength: boolean;
}

export function validatePassword(password: string): PasswordValidationResult {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMinLength = password.length >= 8;

  return {
    isValid: hasUppercase && hasLowercase && hasNumber && hasSymbol && isMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSymbol,
    isMinLength,
  };
}
