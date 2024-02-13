import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { VerifyEmailInterface } from './interfaces/verifyEmail.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('verify_email')
  verifyEmail(payload: VerifyEmailInterface) {
    this.appService.verifyEmail(payload);
  }
}
