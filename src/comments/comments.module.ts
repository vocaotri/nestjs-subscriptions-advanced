import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.schema';
import { JWTService } from 'src/auth/jwt/JWTToken';
import { AuthSchema } from 'src/auth/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: AuthSchema }, { name: 'comments', schema: CommentSchema }]),
  ],
  providers: [CommentsService, CommentsResolver, JWTService]
})
export class CommentsModule { }
