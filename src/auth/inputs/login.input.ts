import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';
@InputType()
export class LoginInput {
    @IsNotEmpty({ message: 'email は必須です。' })
    @IsEmail({}, { message: 'email を正しく入力してください。' })
    @Field()
    readonly email: string;
    @IsNotEmpty({ message: 'password は必須です。' })
    @Field(type => String)
    password: string;
}