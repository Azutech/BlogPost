import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogspotModule } from './blogspot/blogspot.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/BlogPost'), UsersModule, BlogspotModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
