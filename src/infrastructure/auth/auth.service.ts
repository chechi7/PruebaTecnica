import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokenForTesting() {
    const payload = { 
      sub: 'user-id-12345', 
      username: 'CesarDev', 
      email: 'cesar@test.com' 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}