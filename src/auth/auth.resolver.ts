import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { RegisterInput } from './inputs/register.input';
import { JWTService } from './jwt/JWTToken';
import { AuthModel } from './models/auth.model';

@Resolver(of => AuthModel)
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly jwtService: JWTService) { }
    @Query(() => [AuthModel])
    async users(@Context() context) {
        await this.jwtService.checkUserLogger(context, null)
        return this.authService.findAll();
    }
    @Mutation(() => AuthModel)
    async login(@Args('loginData') logigData: LoginInput): Promise<AuthModel> {
        const user = this.authService.login(logigData);
        return user;
    }

    @Mutation(() => AuthModel)
    async resgister(@Args('registerData') registerData: RegisterInput): Promise<AuthModel> {
        const user = this.authService.resgister(registerData);
        return user;
    }
}
