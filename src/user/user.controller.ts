import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { CurrentUser, Authorized } from '../../libs/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerUser: RegisterUserDto) {
    return this.userService.registerUser(registerUser);
  }

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.userService.loginUser(loginUser);
  }

  @Get('/profile')
  @Authorized()
  getUserProfile(@CurrentUser() user: any) {
    return this.userService.getUserProfile(user.id);
  }
}
