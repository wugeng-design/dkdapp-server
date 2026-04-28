import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeDto } from './dto/send-code.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    const success = await this.authService.sendVerificationCode(sendCodeDto.phone);
    return { success, message: '验证码发送成功' };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto.phone, loginDto.code);
    return {
      success: true,
      data: {
        user: {
          id: result.user._id,
          phone: result.user.phone,
          nickname: result.user.nickname,
          avatar: result.user.avatar,
        },
        token: result.accessToken,
      },
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto.phone, registerDto.code, registerDto.nickname);
    return {
      success: true,
      data: {
        user: {
          id: result.user._id,
          phone: result.user.phone,
          nickname: result.user.nickname,
          avatar: result.user.avatar,
        },
        token: result.accessToken,
      },
    };
  }
}