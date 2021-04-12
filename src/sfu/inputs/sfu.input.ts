import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class SFUInput {
    @IsNotEmpty({ message: 'content は必須です。' })
    @Field(type => String)
    sdp: string;

    @IsNotEmpty({ message: 'room は必須です。' })
    @Field(type => String)
    room_id: string;
}