import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  verifyEmail(data: object) {
    console.log(data);
  }
}
