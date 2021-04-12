import { ObjectType, Field } from '@nestjs/graphql';
import { AuthModel } from 'src/auth/models/auth.model';
@ObjectType()
export class SFUModel {
    @Field({ nullable: true })
    id: string;

    @Field(type => String)
    sdp: string;

    @Field(type => String)
    payload: string;

    @Field(type => String)
    room_id?: string;

    @Field(type => String)
    user?: AuthModel;

    @Field(type => Date)
    createdAt?: Date;

    @Field(type => Date)
    updatedAt?: Date;
}