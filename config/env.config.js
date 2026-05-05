import dotenv from 'dotenv';
import path from 'path';

// define environment
const ENV = process.env.ENV || 'dev';


dotenv.config({
  path: path.resolve(process.cwd(), `env/${ENV}.env`)
});


export const config = {
  env: ENV,
  baseURL: process.env.BASE_URL,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
};