export function isEmailValid(email: string): boolean {
  // Expressão regular para validar o email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verifica se o email passado como argumento corresponde ao formato da expressão regular
  return emailRegex.test(email);
}
