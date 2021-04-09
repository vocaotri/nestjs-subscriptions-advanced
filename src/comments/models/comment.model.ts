import { ObjectType, Field } from '@nestjs/graphql';
import { AuthModel } from 'src/auth/models/auth.model';
@ObjectType()
export class CommentModel {
    @Field()
    user: AuthModel;

    @Field(type => String)
    content: string;

    @Field(type => String)
    room: string;

}