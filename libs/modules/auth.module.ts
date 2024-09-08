import { Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../../src/user/interfaces';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(user: IUser): string {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  decode(token: string): any {
    try {
      const decodeJWT = this.jwtService.verify(token);
      return decodeJWT;
    } catch (error: any) {
      throw new UnauthorizedException('JWT: ' + error.message);
    }
  }
}

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE'),
        },
      }),
    }),
  ],
  providers: [TokenService],
  exports: [JwtModule],
})
export class AuthModule {}
