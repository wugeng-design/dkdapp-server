import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async sendVerificationCode(phone: string): Promise<boolean> {
    const code = this.generateVerificationCode();
    
    await this.redisClient.set(
      `verification_code:${phone}`,
      code,
      'EX',
      300,
    );
    
    console.log(`验证码发送到 ${phone}: ${code}`);
    
    return true;
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async verifyCode(phone: string, code: string): Promise<boolean> {
    const storedCode = await this.redisClient.get(`verification_code:${phone}`);
    
    if (!storedCode) {
      throw new UnauthorizedException('验证码已过期，请重新获取');
    }
    
    if (storedCode !== code) {
      throw new UnauthorizedException('验证码错误');
    }
    
    await this.redisClient.del(`verification_code:${phone}`);
    
    return true;
  }

  async login(phone: string, code: string): Promise<{ user: User; accessToken: string }> {
    await this.verifyCode(phone, code);
    
    const user = await this.userService.findOneByPhone(phone);
    
    if (!user) {
      throw new UnauthorizedException('用户不存在，请先注册');
    }
    
    const accessToken = this.jwtService.sign({ userId: user._id });
    
    return { user, accessToken };
  }

  async register(phone: string, code: string, nickname: string): Promise<{ user: User; accessToken: string }> {
    await this.verifyCode(phone, code);
    
    const existingUser = await this.userService.findOneByPhone(phone);
    
    if (existingUser) {
      throw new ConflictException('该手机号已注册');
    }
    
    const user = await this.userService.create({ phone, nickname });
    
    const accessToken = this.jwtService.sign({ userId: user._id });
    
    return { user, accessToken };
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userService.findOneById(userId);
  }
}