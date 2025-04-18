import { registerAs } from '@nestjs/config';
import { W, ServerApi } from 'mongodb';

interface MongoDBOptions {
  serverApi: ServerApi;
  retryWrites: boolean;
  w: W;
}

export interface MongoDBConfig {
  uri: string;
  options: MongoDBOptions;
}

export default registerAs(
  'mongodb',
  (): MongoDBConfig => ({
    uri: process.env.MONGODB_URI || '',
    options: {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      } as ServerApi,
      retryWrites: true,
      w: 'majority' as W,
    },
  }),
);
