import dotenv from 'dotenv';
dotenv.config();

export const env = (key, defaultValue = null) => {
  return process.env[key] || defaultValue;
};
