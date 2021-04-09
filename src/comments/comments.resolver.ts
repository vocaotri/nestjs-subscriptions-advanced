import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { JWTService } from 'src/auth/jwt/JWTToken';
import { CommentsService } from './comments.service';
import { CommentInput } from './inputs/comment.input';
import { CommentModel } from './models/comment.model';
import { PubSub } from 'apollo-server-express';
import * as fs from 'fs'
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
        var arrayData = data.split('\n');

        arrayData = arrayData.map(value => {
            return JSON.parse(value)
        })

        console.log(arrayData);
        // fs.writeFile('src/listSub.txt', JSON.stringify(auth), function (err) {
        //     if (err) return console.log(err);
        // });
        return pubSub.asyncIterator('commentAdded');
    }
}
