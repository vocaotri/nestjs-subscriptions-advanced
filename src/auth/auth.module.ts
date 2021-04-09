import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './auth.schema';
import { JWTService } from './jwt/JWTToken';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: AuthSchema }]),
  ],
  providers: [AuthService, AuthResolver, JWTService]
})
export class AuthModule { }
