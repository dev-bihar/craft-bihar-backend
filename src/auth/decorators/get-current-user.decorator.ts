import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    phoneNumber: string;
    refreshToken?: string;
  };
}

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof RequestWithUser['user'] | undefined,
    context: ExecutionContext,
  ): RequestWithUser['user'] | string => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!data) return request.user;
    return request.user[data];
  },
);
