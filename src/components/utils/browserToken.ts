import crypto from 'crypto';
import Randomstring from 'randomstring';

export const generateBrowserToken = () => {
  const randomstring = Randomstring.generate(10);
  const secretKey = crypto.createHash('sha256').update(randomstring).digest('hex');
  return secretKey;
};
