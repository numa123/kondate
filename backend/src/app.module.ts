import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const mongoUri = process.env.MONGODB_URI;

@Module({
  imports: [MenusModule, MongooseModule.forRoot(mongoUri)],
  controllers: [],
  providers: [],
})
export class AppModule {}
