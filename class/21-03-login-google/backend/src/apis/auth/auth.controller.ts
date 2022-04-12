import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
// express 기반으로 작동하는게 nestjs 임포트 가능

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
  // 강제 회원 가입을 위해
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    //requset 와 IOAuthUser 타입을 넣어줌
    @Req() req: Request & IOAuthUser, //req 를 다이렉트로 뽑을 수 있음
    @Res() res: Response, //req 를 다이렉트로 뽑을 수 있음
  ) {
    // 1 . 가입 확인 가입이 안되어있으면 강제회원가입
    let user = await this.userService.findOne({
      email: req.user.email,
    });

    // 2 . 회원가입
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }
    // 3 . 로그인 refreshtoken이 들어와있으면 로그인임
    this.authService.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/class/21-03-login-google/frontend/social-login.html',
    );
  }
}
