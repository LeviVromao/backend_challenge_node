import { IMailProvider, IMessage } from "../IEmailProvider";
import { config } from "dotenv";
const nodemailer = require("nodemailer");
config()

export class NodeMailProvider implements IMailProvider {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.SECURE,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS,
            },
        });
    }
    
    async sendEmail(message: IMessage) {
    this.transporter.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email,
        },
        subject: process.env.TEXT_MAIL_TITLE || message.subject,
        text: process.env.TEXT_MAIL_BODY?.replace('{name}', message.to.name)
          .replace('{email}', message.to.email)
          .replace('{comment}', message.body),
        html: `
            <h1>JOGADINHA DO PAQUETA</h1>
            <p>
            ${process.env.TEXT_MAIL_BODY?.replace('{name}', message.to.name)
              .replace('{email}', message.from.email)
              .replace('{comment}', message.body)}
              </p>
            <p>😎</p>
          `,
    });
    }
}
