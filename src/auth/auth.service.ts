import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput } from './inputs/login.input';
import { AuthInterFace } from './interfaces/auth.interface';
import { JWTService } from './jwt/JWTToken';
import *  as bcrypt from 'bcrypt';
import { RegisterInput } from './inputs/register.input';

@Injectable()
export class AuthService {
    constructor(@InjectModel('users') private readonly userModel: Model<AuthInterFace>, private readonly jwtService: JWTService) { }
    async findAll(): Promise<AuthInterFace[]> {
        return await this.userModel.find();
    }
    async login(loginUserData: LoginInput) {
        if (await this.userModel.countDocuments({ email: loginUserData.email }) === 0)
            throw new Error(JSON.stringify(["アカウントが存在しないかパスワードが間違っています。"]));
        const user = await this.userModel.findOne({ email: loginUserData.email });
        const isPasswordMatching = await bcrypt.compare(
            loginUserData.password,
            user.password
        );
        if (!isPasswordMatching)
            throw new Error(JSON.stringify(["アカウントが存在しないかパスワードが間違っています。"]));
        user.password = undefined;
        const dataToken = {
            id: user.id,
            email: user.email
        };
        user.access_token = await this.jwtService.generateAccessToken(dataToken);
        return user;
    }
    async resgister(registerData: RegisterInput) {
        const hashedPassword = await bcrypt.hash(registerData.password, 11);
        if (await this.userModel.countDocuments({ "email": registerData.email }) > 0)
            throw new Error(JSON.stringify(["email is exist"]));
        const createAdmin = new this.userModel({ ...registerData, password: hashedPassword });
        const user = await createAdmin.save()
        const dataToken = {
            id: user.id,
            email: user.email,
        };
        user.access_token = await this.jwtService.generateAccessToken(dataToken);
        return createAdmin;
    }
}
