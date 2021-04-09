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
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GraphQLModule.forRoot({
      context: ({ req, connection }) => connection ? { req: { headers: connection.context } } : { req },
      subscriptions: {
        onDisconnect: (webSocket, context) => {
          console.log('Disconnected!', context.initPromise)
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
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
