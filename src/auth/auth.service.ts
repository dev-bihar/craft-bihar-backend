// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import {
  TokensDto,
  UpdateUserDto,
  CheckUserDto,
  SendOtpDto,
  VerifyOtpDto,
  UpdateProfileDto,
} from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface Bcrypt {
  hash: (data: string, saltOrRounds: number) => Promise<string>;
  compare: (data: string, encrypted: string) => Promise<boolean>;
}

const bcryptTyped = bcrypt as unknown as Bcrypt;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject('JwtService') private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Dummy OTPs for testing
  private readonly DUMMY_OTPS = {
    phone: ['123456', '000000'],
  };

  async logout(userId: string): Promise<boolean> {
    await this.userModel.updateOne({ _id: userId }, { refreshToken: null });
    return true;
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<TokensDto> {
    const user = await this.userModel.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const isRefreshTokenValid = await bcryptTyped.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.getTokens(
      (user._id as Types.ObjectId).toHexString(),
      user.phoneNumber,
    );
    await this.updateRefreshToken(
      (user._id as Types.ObjectId).toHexString(),
      tokens.refreshToken,
    );

    return tokens;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcryptTyped.hash(
        updateUserDto.password,
        10,
      );
    }

    // Only update allowed fields
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    await user.save();
    return user;
  }

  async getById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async verifyToken(
    token: string,
  ): Promise<{ sub: string; phoneNumber: string }> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch (error: unknown) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }

  private async getTokens(
    userId: string,
    phoneNumber: string,
  ): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          phoneNumber,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          phoneNumber,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcryptTyped.hash(refreshToken, 10);
    await this.userModel.updateOne(
      { _id: userId },
      { refreshToken: hashedRefreshToken },
    );
  }

  async checkUser(checkUserDto: CheckUserDto): Promise<{ isNewUser: boolean }> {
    const { phoneNumber } = checkUserDto;
    const user = await this.userModel.findOne({ phoneNumber });
    return { isNewUser: !user };
  }

  async sendOtp(sendOtpDto: SendOtpDto): Promise<{ success: boolean }> {
    const { phoneNumber, name } = sendOtpDto;

    // Generate a random OTP from our dummy list
    const otp =
      this.DUMMY_OTPS.phone[
        Math.floor(Math.random() * this.DUMMY_OTPS.phone.length)
      ];

    // Set OTP expiry to 5 minutes from now
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    let user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      if (!name) {
        throw new BadRequestException('Name is required for new users');
      }
      user = await this.userModel.create({
        phoneNumber,
        name: name,
      });
    }

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // In a real implementation, you would send the OTP via SMS here
    console.log(`OTP for phone ${phoneNumber}: ${otp}`);

    return { success: true };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<TokensDto> {
    const { phoneNumber, otp, name } = verifyOtpDto;

    const user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (user.otpExpiresAt < new Date()) {
      throw new UnauthorizedException('OTP expired');
    }

    // Update user name during verification if it's a new user
    if (!user.name) {
      user.name = name;
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    // Generate tokens
    const tokens = await this.getTokens(
      (user._id as Types.ObjectId).toHexString(),
      user.phoneNumber,
    );
    await this.updateRefreshToken(
      (user._id as Types.ObjectId).toHexString(),
      tokens.refreshToken,
    );

    return tokens;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    user.name = updateProfileDto.name;
    await user.save();

    return user;
  }
}
