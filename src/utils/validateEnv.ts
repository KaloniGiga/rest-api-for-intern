import { cleanEnv, port, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_USER: str(),
    DATABASE_PASSWORD: str(),
    DATABASE_HOST: str(),
    DATABASE_NAME: str(),
  });
}
