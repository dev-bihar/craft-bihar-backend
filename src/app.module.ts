import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { initializeFirebase } from './config/firebase.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import mongodbConfig, { MongoDBConfig } from './config/mongodb.config';

@Module({
  imports: [
    CategoryModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongodb = configService.get<MongoDBConfig>('mongodb');
        return {
          uri: mongodb.uri,
          ...mongodb.options,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    initializeFirebase();
  }
}
