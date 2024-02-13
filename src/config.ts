import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    kafka: {
      broker: process.env.KAFKA_BROKER,
    },
    mail: {
      apiKey: process.env.MAILJET_API_KEY,
      secretKey: process.env.MAILJET_API_SECRET_KEY,
      from: process.env.MAIL_FROM,
      name: process.env.MAIL_NAME,
      url: process.env.EMAIL_CONFIRMATION_URL,
    },
  };
});
