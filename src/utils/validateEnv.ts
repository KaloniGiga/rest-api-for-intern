import { cleanEnv, port, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    POSTGRES_URL: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    DATABASE_HOST: str(),
    DATABASE_NAME: str(),
  });
}
