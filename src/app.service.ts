import { Injectable } from '@nestjs/common';
import { MailjetService } from './mailjet/services/mailjet.service';
import { VerifyEmailInterface } from './interfaces/verifyEmail.interface';

@Injectable()
export class AppService {
  constructor(private mailjetService: MailjetService) {}

  getHello(): string {
    return 'Hello World!';
  }

  verifyEmail(payload: VerifyEmailInterface) {
    console.log(payload);

    const { email, verifyEmailToken } = payload;

    this.mailjetService.sendVerificationEmail(email, verifyEmailToken);
  }
}
