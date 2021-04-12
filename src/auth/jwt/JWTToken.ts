import { AuthInterFace } from '../interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { connect, model, Model } from 'mongoose';
import { AuthToken } from '../interfaces/token';
import { AuthSchema } from '../auth.schema';

export class JWTService {
    constructor(@InjectModel('users') private readonly userModel: Model<AuthInterFace>) { }
    async generateAccessToken(data): Promise<string> {
        return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '7889232s' });
    }
    async verifyAccessToken(token): Promise<AuthToken> {
        let user = await jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return null;
            return user;
        })
        if (user === null)
            return {};
        if (this.userModel) {
            return await this.userModel.findById(user.id).exec();
        } else {
            const User: Model<AuthInterFace> = model('user', AuthSchema);
            await connect('mongodb://localhost:27017/webrtc', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            return await User.findById(user.id);
        }
    }
    async checkUserLogger(context, authType) {

        let token = "";
        if (context.req) {
            const { headers: { authorization, Authorization } } = context.req;
            if (authorization) {
                token = authorization.split(" ")[1];
            };
            if (Authorization) {
                token = Authorization.split(" ")[1];
            }
        } else {
            var { initPromise } = context;
            var tokenAuthorization = await initPromise;
            token = tokenAuthorization.Authorization.split(" ")[1];
        }
        let user = await this.verifyAccessToken(token);
        if (user === null || Object.keys(user).length === 0) {
            throw new Error(JSON.stringify(["you are not login"]));
        }
        return user;
    }
}