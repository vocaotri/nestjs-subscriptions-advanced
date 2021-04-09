import { AuthInterFace } from '../interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthToken } from '../interfaces/token';
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
        return await this.userModel.findById(user.id).exec();
    }
    async checkUserLogger(context, authType) {
        let token = "";
        const { headers: { authorization, Authorization } } = context.req;
        if (authorization) {
            token = authorization.split(" ")[1];
        };
        if (Authorization) {
            token = Authorization.split(" ")[1];
        }

        let user = await this.verifyAccessToken(token);
        if (user === null || Object.keys(user).length === 0) {
            throw new Error(JSON.stringify(["you are not login"]));
        }
        return user;
    }
}