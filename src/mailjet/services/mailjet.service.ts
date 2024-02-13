import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as mailjet from 'node-mailjet';
import config from 'src/config';

@Injectable()
export class MailjetService {
  private readonly client: mailjet.Client;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    this.client = mailjet.Client.apiConnect(
      configService.mail.apiKey,
      configService.mail.secretKey,
    );
  }

  async sendVerificationEmail(email: string, verifyEmailToken: string) {
    const url = `${this.configService.mail.url}?token=${verifyEmailToken}`;

    const request = this.client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: this.configService.mail.from,
            Name: this.configService.mail.name,
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: 'Verify your email address',
          HTMLPart: `
            <p>Dear user,</p>
            <p>Please click the following link to verify your email address:</p>
            <p><a href="${url}">Verify Email</a></p>
          `,
        },
      ],
    });

    const response = await request;
    console.log(response.body);
  }
}
