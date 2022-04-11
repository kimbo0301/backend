import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/JWT';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken(user) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
      // jwt 토큰 발급 expireIn 유효기간
    );
  }
}
