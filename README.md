# Test API

API made with typescript using the [NestJS](https://github.com/nestjs/nest) framework

## Prerequisits

This API needs the following sofware to be installed:

- [Node.js 14+](https://nodejs.org/en/) (14.15+ recommended)
- [MySQL](https://www.mysql.com/) (8.0+ recommended)

## Installation and Running

1. Install dependencies with npm:

   ```
   npm install
   ```

2. Create .env file

   ```
   npm run env:create
   ```

   - Assigning values to empty variables is required

3. Create Database and insert Dummy data

   ```
   npm run db:create
   ```

4. Running the app

   ```
   # development
   npm run start

   # watch mode
   npm run start:dev
   ```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
