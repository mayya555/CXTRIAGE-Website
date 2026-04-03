export interface PasswordValidationResult {
  isValid: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isMinLength: boolean;
}

export function validatePhoneNumber(phone: string): { isValid: boolean; message: string } {
  // Strip any spaces, dashes, or country code prefix
  const cleaned = phone.replace(/[\s\-]/g, '').replace(/^\+91/, '');
  if (!/^\d{10}$/.test(cleaned)) {
    return { isValid: false, message: 'Phone number must be exactly 10 digits' };
  }
  if (!/^[6-9]/.test(cleaned)) {
    return { isValid: false, message: 'Phone number must start with 6, 7, 8, or 9' };
  }
  return { isValid: true, message: '' };
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
