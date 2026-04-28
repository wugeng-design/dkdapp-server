import { Injectable, Logger } from '@nestjs/common';
import Dysmsapi20170525, { SendSmsRequest } from '@alicloud/dysmsapi20170525';
import * as OpenApi from '@alicloud/openapi-client';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly smsClient: Dysmsapi20170525;
  private readonly signName: string;
  private readonly templateCode: string;

  constructor() {
    const config = new OpenApi.Config({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || '',
    });
    config.endpoint = 'dysmsapi.aliyuncs.com';
    
    this.smsClient = new Dysmsapi20170525(config);
    this.signName = process.env.SMS_SIGN_NAME || '';
    this.templateCode = process.env.SMS_TEMPLATE_CODE || '';
  }

  async sendVerificationCode(phone: string, code: string): Promise<boolean> {
    if (!this.signName || !this.templateCode) {
      this.logger.warn('短信配置未完成，验证码仅打印到控制台');
      this.logger.log(`验证码发送到 ${phone}: ${code}`);
      return true;
    }

    try {
      const request: SendSmsRequest = {
        phoneNumbers: phone,
        signName: this.signName,
        templateCode: this.templateCode,
        templateParam: JSON.stringify({ code }),
      };

      const response = await this.smsClient.sendSms(request);
      
      if (response.body.code === 'OK') {
        this.logger.log(`短信发送成功: ${phone}`);
        return true;
      } else {
        this.logger.error(`短信发送失败: ${response.body.message}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`短信发送异常: ${error.message}`);
      return false;
    }
  }
}
