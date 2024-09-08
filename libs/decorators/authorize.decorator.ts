import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'libs/modules/auth.module';
import { UnauthorizedException } from '@nestjs/common';

class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenService) private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.header('authorization');
    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [type, token] = authorization.split(' ', 2);
    if ((type !== 'bearer' && type !== 'Bearer') || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decodedJwt = await this.tokenService.decode(token);
      if (!decodedJwt) {
        throw new UnauthorizedException('Invalid token');
      }

      context.switchToHttp().getRequest<Request>().user = decodedJwt;
      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Token verification failed: ' + error.message,
      );
    }
  }
}

export const Authorized = () => applyDecorators(UseGuards(AuthGuard));

export type AuthorizedHeader = Readonly<{
  userId: string;
  email: string;
  name: string;
}>;
