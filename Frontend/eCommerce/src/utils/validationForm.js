const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isValidName = (name) => {
  const namePattern = /^[a-zA-Z\s]*$/; // Solo letras y espacios
  name = name.trim(); // Elimina espacios en blanco al principio y al final
  const minLength = 3;
  return namePattern.test(name) && name.length >= minLength; // Verifica que el nombre cumpla con el patrón y la longitud mínima
};

const isValidPassword = (password) => {
  // Define los criterios de validación
  const minLength = 8; // Longitud mínima
  const hasUpperCase = /[A-Z]/.test(password); // Al menos una mayúscula
  const hasLowerCase = /[a-z]/.test(password); // Al menos una minúscula
  const hasNumbers = /\d/.test(password); // Al menos un número
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Al menos un carácter especial

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
};

export const validation = {
  isValidEmail,
  isValidPassword,
  isValidName,
};
