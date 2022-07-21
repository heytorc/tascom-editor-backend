import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthUserDto | undefined> {
    const user = await this.usersService.findByUserName(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return undefined;
  }

  async login(user: AuthUserDto) {
    const payload = { username: user.username, sub: user._id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return false;
    }
  }
}
