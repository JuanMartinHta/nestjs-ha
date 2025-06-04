/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/user/domain/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): { access_token: string } {
    return this.authService.login(req.user as User);
  }
}
