import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { helper } from './helper-fun';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { JWTService } from './auth/jwt/JWTToken';
import { SfuModule } from './sfu/sfu.module';
import * as fs from 'fs'
import * as helpFun from './helper-fun';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GraphQLModule.forRoot({
      context: ({ req, connection }) => connection ? { req: { headers: connection.context } } : { req },
      subscriptions: {
        onDisconnect: async (webSocket, context) => {
          const auth = await JWTService.prototype.checkUserLogger(context, null)
          const data = fs.readFileSync('src/listSub.txt', 'utf8');
          var arrayData = data.split('\n').filter(function (el) {
            return el !== ""
          });
          var arrayResult = helpFun.popIfExit(arrayData, auth)
          fs.writeFile('src/listSub.txt', arrayResult.join("\n"), 'utf8', function (err) {
            if (err) return console.log(err);
          });
        },
      },
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response ? error.extensions.exception.response.message : helper.JsonString(error.message),
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/webrtc', {
      useFindAndModify: false,
      useCreateIndex: true
    }),
    CommentsModule,
    AuthModule,
    SfuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
