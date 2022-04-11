import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.services';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1 . 로그인(이메일과 비밀번호가 일치하는 유저 찾기)
    const user = await this.userService.findOne({ email });
    console.log(user);
    // 2 . 일치하는 유저가 없으면 에러 던지기
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 이메일입니다.');

    // 3 . 일치하는 유저가 있지만 암호가 틀렸다면 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    //user 테이블엔 암호화 되어있기 때문에 암호화 비교를 위해 bycrypt compare사용
    // return 값이 프로미스이기 때문에 await
    if (!isAuth)
      throw new UnprocessableEntityException('암호가 일치하지 않습니다.');

    // 4 . 일치하는 유저가 있으면 accessToken(=JWT)을 만들어서 프론트엔드에 주기
    // services에 만들어 놓고 가져와서 사용
    return this.authService.getAccessToken({ user });
  }
}
