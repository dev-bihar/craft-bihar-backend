import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-token')
  async verifyToken(@Body('token') token: string) {
    const decodedToken = await this.authService.verifyToken(token);
    return { decodedToken };
  }

  @Post('get-user')
  async getUserByPhoneNumber(@Body('phoneNumber') phoneNumber: string) {
    const user = await this.authService.getUserByPhoneNumber(phoneNumber);
    return { user };
  }

  @Post('create-user')
  async createUserWithPhoneNumber(@Body('phoneNumber') phoneNumber: string) {
    const user = await this.authService.createUserWithPhoneNumber(phoneNumber);
    return { user };
  }
}
