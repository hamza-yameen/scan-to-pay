import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import {
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createSuccessResponse } from '../../libs/helpers/api-response.helpers';
import { TokenService } from 'libs/modules/auth.module';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  // Register User
  async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    const doesUserExist: any = await this.prisma.user.findFirst({
      where: { name: name },
    });
    if (doesUserExist) {
      throw new ConflictException(`User with name ${name} already exists.`);
    }

    const doesEmailExist: any = await this.prisma.user.findFirst({
      where: { email: email },
    });
    if (doesEmailExist) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    try {
      const newUser: any = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      const token: string = this.tokenService.sign(newUser);

      return createSuccessResponse({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          token,
        },
      });
    } catch (error: any) {
      console.log('error : ', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  // Login User
  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const getUser: any = await this.prisma.user.findFirst({
      where: { email: email },
    });
    if (!getUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = bcrypt.compareSync(password, getUser.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token: string = this.tokenService.sign(getUser);

    return createSuccessResponse({
      message: 'User created successfully',
      user: {
        id: getUser.id,
        name: getUser.name,
        email: getUser.email,
        token,
      },
    });
  }

  // Get User Profile
  async getUserProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    return createSuccessResponse({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
