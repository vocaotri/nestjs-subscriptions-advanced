import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { JWTService } from 'src/auth/jwt/JWTToken';
import { CommentsService } from './comments.service';
import { CommentInput } from './inputs/comment.input';
import { CommentModel } from './models/comment.model';
import { PubSub } from 'apollo-server-express';
import * as fs from 'fs'
import * as helpFun from '../helper-fun';
const pubSub = new PubSub();
@Resolver()
export class CommentsResolver {
    constructor(private readonly commentsService: CommentsService, private readonly jwtService: JWTService) { }
    @Query(() => [CommentModel])
    async comments() {
        return this.commentsService.findAll();
    }
    @Mutation(() => CommentModel)
    async addComment(@Context() context, @Args('commentData') commentData: CommentInput): Promise<CommentModel> {
        const auth = await this.jwtService.checkUserLogger(context, null);
        const newComment = await this.commentsService.addComment(commentData, auth);
        pubSub.publish('commentAdded', { commentAdded: newComment });
        return newComment;
    }
    @Subscription(returns => CommentModel, {
        filter(payload, variables) {
            return payload.commentAdded.room === '99553';
        }
    })
    async commentAdded(@Context() context) {
        var auth = await this.jwtService.checkUserLogger(context, null);
        const data = fs.readFileSync('src/listSub.txt', 'utf8');
        var arrayData = data.split('\n').filter(function (el) {
            return el !== ""
        });
        arrayData = arrayData.map(value => {
            return JSON.parse(value)
        })
        var arrResult = helpFun.pushIfNotExist(arrayData, auth)
        arrResult = arrResult.map(value => {
            return JSON.stringify(value)
        })
        fs.writeFile('src/listSub.txt', arrResult.join("\n"), 'utf8', function (err) {
            if (err) return console.log(err);
        });
        return pubSub.asyncIterator('commentAdded');
    }
}
