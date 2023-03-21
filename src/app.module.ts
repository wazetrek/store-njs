import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpModule,
    // {
    //   provide: 'TASKS',
    //   useFactory: async () => {
    //     const response = await axios({
    //       method: 'GET',
    //       // url: 'https://jsonplaceholder.typicode.com/todos',
    //       url: '',
    //     });
    //     return response.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
