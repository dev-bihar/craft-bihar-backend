import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      name: 'Craft Bihar API',
      version: '1.0.0',
      description: 'Backend API for Craft Bihar e-commerce platform',
    };
  }
}
