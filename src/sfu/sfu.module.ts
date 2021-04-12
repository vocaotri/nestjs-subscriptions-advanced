import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/auth/auth.schema';
import { JWTService } from 'src/auth/jwt/JWTToken';
import { SfuResolver } from './sfu.resolver';
import { SfuService } from './sfu.service';
import { SFUSchema } from './sfu.chema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: AuthSchema }, { name: 'sfus', schema: SFUSchema }]),
  ],
  providers: [SfuResolver, JWTService, SfuService]
})
export class SfuModule { }
