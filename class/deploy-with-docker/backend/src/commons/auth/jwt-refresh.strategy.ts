import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  // guard acess 와 연결됨
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req.headers);
        // req안에 헤더에 쿠기가 같이 들어오고 쿠키안에서 리프레쉬토큰을 따로 뽑아서 뽑은 내용을 리턴해주면됨

        // req.headers.cookie에 있는 refreshToken 골라내기
        return req.headers.cookie.replace('refreshToken=', '');
        // return '여기가 refreshToken이 들어오는 자리';
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
  // context.req.user에 등록됨
}
