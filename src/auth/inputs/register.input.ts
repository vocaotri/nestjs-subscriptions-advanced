import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
@InputType()
export class RegisterInput {
    @IsNotEmpty({ message: 'email not null' })
    @IsEmail({}, { message: 'email invalidate' })
    @Field()
    readonly email: string;
    @IsNotEmpty({ message: 'name not null' })
    @Field()
    readonly name: string;
    @IsNotEmpty({ message: 'password not null' })
    @Field(type => String)
    password: string;

    @IsPhoneNumber('JP', { message: "Phone invalidate" })
    @Field({ nullable: true })
    readonly phone?: string;
}