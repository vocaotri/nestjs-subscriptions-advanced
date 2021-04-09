import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class AuthModel {
    @Field({ nullable: true })
    id: string;

    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => String)
    email: string;

    @Field({ nullable: true })
    phone?: string;

    @Field(type => Int, { nullable: true })
    status?: number;

    @Field(type => Int, { nullable: true })
    role?: number;

    @Field(type => String)
    password: string;

    @Field(type => Date)
    createdAt?: Date;

    @Field(type => Date)
    updatedAt?: Date;

    @Field({ nullable: true })
    access_token?: string;
}