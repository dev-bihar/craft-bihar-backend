// src/auth/dto/auth.dto.ts
import { IsString, MinLength, IsOptional, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  password: string;
}

export class TokensDto {
  accessToken: string;
  refreshToken: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}

export class CheckUserDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  name?: string; // Optional name for new users
}

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
