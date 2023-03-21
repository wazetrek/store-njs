import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';

const API_KEY = '1231234';
const API_KEY_PROD = 'PROD123132132A';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_END === 'PROD' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
