import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailjetModule } from './mailjet/mailjet.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_INITDB_ROOT_USERNAME:
          process.env.NODE_ENV === 'prod' ? Joi.string().required() : '',
        MONGO_INITDB_ROOT_PASSWORD:
          process.env.NODE_ENV === 'prod' ? Joi.string().required() : '',
        MONGO_DB: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    MailjetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
