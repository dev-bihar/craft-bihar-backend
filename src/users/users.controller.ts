import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Request as ExpressRequest } from 'express';

interface UserPayload {
  uid: string;
  email?: string;
  [key: string]: any;
}

@Controller('users')
export class UsersController {
  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  getProfile(
    @Request() req: ExpressRequest & { user: UserPayload },
  ): UserPayload {
    return req.user;
  }
}
