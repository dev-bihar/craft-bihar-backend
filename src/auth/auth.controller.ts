import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UpdateUserDto,
  CheckUserDto,
  SendOtpDto,
  VerifyOtpDto,
  UpdateProfileDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { User } from './schemas/user.schema';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    refreshToken?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetCurrentUserId() userId: string): Promise<User> {
    return await this.authService.getById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(
    @GetCurrentUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(userId, updateUserDto);
  }

  @Post('check-user')
  async checkUser(@Body() checkUserDto: CheckUserDto) {
    return this.authService.checkUser(checkUserDto);
  }

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(req.user.sub, updateProfileDto);
  }
}
