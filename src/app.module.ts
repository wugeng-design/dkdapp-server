import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FigureModule } from './figure/figure.module';
import { SectModule } from './sect/sect.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/dkdapp'),
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dkdapp_jwt_secret',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    AuthModule,
    FigureModule,
    SectModule,
  ],
})
export class AppModule {}
