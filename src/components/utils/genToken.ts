export const generateToken = (): string => {
  const tokenLength = 8;
  let token = '';
  const characters = '0123456789';
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}
