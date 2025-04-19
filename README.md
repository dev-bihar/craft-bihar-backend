# NestJS Project

![Nest Logo](https://nestjs.com/img/logo-small.svg)

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![Package License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)
[![Backers](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)
[![Donate](https://img.shields.io/badge/Donate-PayPal-ff3f59.svg)](https://paypal.me/kamilmysliwiec)
[![Support](https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg)](https://opencollective.com/nest#sponsor)
[![Twitter](https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow)](https://twitter.com/nestframework)

A progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Craft Bihar Backend Documentation

## Project Structure

```
src/
├── auth/                    # Authentication Module
│   ├── auth.controller.ts   # Auth endpoints (register, login, logout, etc.)
│   ├── auth.service.ts      # Auth business logic
│   ├── auth.module.ts       # Auth module configuration
│   ├── dto/                 # Data Transfer Objects
│   │   ├── auth.dto.ts      # Auth DTOs (RegisterDto, LoginDto, etc.)
│   │   └── ...
│   ├── guard/              # Authentication Guards
│   │   ├── jwt-auth.guard.ts    # JWT Authentication Guard
│   │   ├── refresh-token.guard.ts # Refresh Token Guard
│   │   └── firebase-auth.guard.ts # Firebase Authentication Guard
│   ├── decorators/         # Custom Decorators
│   │   ├── public.decorator.ts   # Public route decorator
│   │   ├── user.decorator.ts     # User decorator for getting current user
│   │   └── ...
│   ├── strategies/         # Authentication Strategies
│   │   ├── jwt.strategy.ts      # JWT Strategy
│   │   └── refresh-token.strategy.ts # Refresh Token Strategy
│   └── schemas/            # Database Schemas
│       └── user.schema.ts  # User Schema
│
├── products/               # Products Module
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   ├── dto/
│   │   └── products.dto.ts
│   └── schemas/
│       └── product.schema.ts
│
├── category/              # Category Module
│   ├── category.controller.ts
│   ├── category.service.ts
│   ├── category.module.ts
│   ├── dto/
│   │   └── category.dto.ts
│   └── schemas/
│       └── category.schema.ts
│
├── config/                # Configuration Files
│   ├── firebase.config.ts # Firebase Configuration
│   └── mongodb.config.ts  # MongoDB Configuration
│
├── app.module.ts          # Root Module
├── app.controller.ts      # Root Controller
└── main.ts               # Application Entry Point
```

## Module Descriptions

### Auth Module (`/auth`)

- Handles user authentication and authorization using OTP-based system
- Endpoints:
  - `POST /auth/check-user` - Check if user exists
  - `POST /auth/send-otp` - Send OTP to phone number
  - `POST /auth/verify-otp` - Verify OTP and get tokens
  - `POST /auth/logout` - User logout
  - `POST /auth/refresh` - Refresh access token
  - `GET /auth/me` - Get current user profile
  - `PUT /auth/update` - Update user details
  - `PATCH /auth/profile` - Update user profile

### Products Module (`/products`)

- Manages product-related operations
- Endpoints:
  - `GET /products` - Get all products
  - `GET /products/:id` - Get product by ID
  - `POST /products` - Create new product
  - `PUT /products/:id` - Update product
  - `DELETE /products/:id` - Delete product

### Category Module (`/category`)

- Handles product categories
- Endpoints:
  - `GET /category` - Get all categories
  - `GET /category/:id` - Get category by ID
  - `POST /category` - Create new category
  - `PUT /category/:id` - Update category
  - `DELETE /category/:id` - Delete category

## Configuration Files

### Environment Variables (`.env`)

```
# Firebase Config
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_APP_ID=...

# MongoDB Config
MONGODB_URI=...

# JWT Secrets
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...

# Server
PORT=3001
```

## Authentication Flow

The authentication system uses Phone Number based login with OTP verification.

### Phone Login Flow

1. **Check User**

   - Send phone number to `/auth/check-user`
   - Response indicates if user is new or existing

2. **Send OTP**

   - For new users: Provide name
   - Send phone number and name to `/auth/send-otp`
   - OTP is sent to the provided phone number

3. **Verify OTP**

   - User enters received OTP
   - Send verification request to `/auth/verify-otp`
   - On success, receive JWT tokens

4. **Profile Management**
   - Get profile: `GET /auth/me`
   - Update details: `PUT /auth/update`
   - Update profile: `PATCH /auth/profile`

### Testing OTPs

For development/testing, use these dummy OTPs:

**Phone OTPs:**

- 123456
- 000000
- 678901
- 901234

## API Documentation

See [API Documentation](docs/api/auth.md) for detailed endpoint information.

## Postman Collection

Import the [Postman Collection](docs/postman/auth.postman_collection.json) to test the API endpoints.

## Environment Variables

Required environment variables:

```
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

## Database Schema

### User Schema

```typescript
{
  phoneNumber: string;
  name: string;
  otp?: string;
  otpExpiresAt?: Date;
  isVerified: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product Schema

```typescript
{
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Category Schema

```typescript
{
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Response Format

### Success Response

```typescript
{
  success: true,
  data: any,
  message?: string
}
```

### Error Response

```typescript
{
  success: false,
  error: {
    message: string,
    code: number
  }
}
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the server:

```bash
npm run start:dev
```

## Development

- Use `npm run start:dev` for development
- Use `npm run build` to build the application
- Use `npm run start:prod` for production

## Testing

- Use `npm run test` to run tests
- Use `npm run test:watch` for test watching
- Use `npm run test:cov` for test coverage

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
