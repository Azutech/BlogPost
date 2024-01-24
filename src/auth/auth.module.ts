import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

@Module({
  imports : [JwtModule.register({
    secret: 'your-secret-key', // Replace with a secure secret key
    signOptions: { expiresIn: '1h' }, // Set token expiration time
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
