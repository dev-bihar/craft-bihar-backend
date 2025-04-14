import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID'),
    };

    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  public auth;
}
