import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('auth/validate-token')
  async validateToken(@Request() req) {
    const {
      query: { token = '' },
    } = req;

    const isValid = await this.authService.validateToken(token);

    return { isValid };
  }
}
