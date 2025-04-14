import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor() {}

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid token';
      throw new Error(`Invalid token: ${errorMessage}`);
    }
  }

  async getUserByPhoneNumber(
    phoneNumber: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
      return userRecord;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'User not found';
      throw new Error(`User not found: ${errorMessage}`);
    }
  }

  async createUserWithPhoneNumber(
    phoneNumber: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await admin.auth().createUser({
        phoneNumber,
      });
      return userRecord;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error creating user';
      throw new Error(`Error creating user: ${errorMessage}`);
    }
  }
}
