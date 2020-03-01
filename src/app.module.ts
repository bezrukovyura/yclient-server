import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.isHeroku ? process.env.dbServer : 'mongodb://localhost:27017/yclient'),
    UserModule
  ],
})
export class AppModule {}
