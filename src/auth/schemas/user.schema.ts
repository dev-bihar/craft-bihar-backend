import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpiresAt: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
