interface IAdress {
  email: string
  name: string
}

export interface IMessage {
  to: IAdress
  from: IAdress
  subject: string
  body: string
  text: string
  html: string
}

export interface IMailProvider {
  sendEmail(message: IMessage): Promise<void>
}