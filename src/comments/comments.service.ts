import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentInterFace } from './interfaces/comment.interface';
import { CommentInput } from './inputs/comment.input';
import { AuthToken } from 'src/auth/interfaces/token';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('comments') private readonly commentModel: Model<CommentInterFace>) { }
    async addComment(dataComment: CommentInput, auth: AuthToken): Promise<CommentInterFace> {
        const newComment = new this.commentModel({ ...dataComment, user: auth.id });
        const comment = await newComment.save().then(newComment => newComment.populate('user').execPopulate());
        return comment;
    }
    async findAll(): Promise<CommentInterFace[]> {
        return await this.commentModel.find().populate('user');
    }
}
