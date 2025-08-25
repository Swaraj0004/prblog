import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from 'src/auth/types/auth-jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private JwtService: JwtService) { }


    async validateLocalUser({ email, password }: SignInInput) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.password) throw new UnauthorizedException('user not found');

        const passwordMatched = await verify(user.password, password);

        if (!passwordMatched) throw new UnauthorizedException('invalid credentials');

        return user;
    }

    async genratetoken(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const accessToken = await this.JwtService.signAsync(payload);
        return { accessToken };
    }

    async login(user: User) {
        const { accessToken } = await this.genratetoken(user.id);
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            accessToken,
        }
    }
}
