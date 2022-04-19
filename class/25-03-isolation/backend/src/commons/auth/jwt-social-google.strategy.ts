import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // guard acess 와 연결됨
  constructor() {
    super({
      clientID: '입력하기',
      clientSecret: '입력하기',
      callbackURL: '입력하기',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: '1111',
      name: profile.displayName,
      age: 0,
      // 강제 회원 가입을 위해
    };
  }
  // context.req.user에 등록됨
}
