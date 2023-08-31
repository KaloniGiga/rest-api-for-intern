import { cleanEnv, port, str } from 'envalid';

export default function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
  });
}
