/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/user/domain/user.entity';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): { access_token: string; refresh_token: string } {
    return this.authService.login(req.user as User);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Request() req): { access_token: string } {
    const refreshToken: string = String(req.headers.authorization).replace(
      'Bearer ',
      '',
    );
    return this.authService.refreshToken(refreshToken);
  }
}
