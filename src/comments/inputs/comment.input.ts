import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CommentInput {
    @IsNotEmpty({ message: 'content は必須です。' })
    @Field(type => String)
    content: string;

    @IsNotEmpty({ message: 'room は必須です。' })
    @Field(type => String)
    room: string;
}