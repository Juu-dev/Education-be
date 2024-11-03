import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '6000', 10),
  env: process.env.APP_ENV,
  clientUrl: process.env.CLIENT_URL,
  enableSwagger: process.env.ENABLE_SWAGGER,
  enableCors: process.env.ENABLE_CORS,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
}));
