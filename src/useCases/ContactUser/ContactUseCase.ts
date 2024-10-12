import { IContactRequestDTO } from "./ContactDTO"
import { isValidEmail, handleRecaptchaValidation } from "../../utils/validator"
import sendErrorResponse from "../../utils/handleErrors"
import { IMailProvider } from "../../providers/IEmailProvider"
import { config } from "dotenv"
config()

export class ContactUseCase {
  constructor(
    private iMailProvider: IMailProvider
  ){}
  async execute(data: IContactRequestDTO){
    const validCaptcha = await handleRecaptchaValidation(data.g_recaptcha_response)

    if(validCaptcha === false) {
      throw new Error(JSON.stringify(sendErrorResponse(401, "BadRequestError", "The captcha is incorrect!")))
    }

    if(!isValidEmail(data.email)) {
      throw new Error(JSON.stringify(sendErrorResponse(400, "BadRequestError", "The email is invalid")))
    }

    if(data.name === "" || data.name.length < 1) {
      throw new Error(JSON.stringify(sendErrorResponse(400, "BadRequestError", "The name is empty")))
    }
    
    await this.iMailProvider.sendEmail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: process.env.MAIL_AUTH_NAME,
        email: process.env.MAIL_AUTH_USER,
      },
      subject: process.env.TEXT_MAIL_TITLE,
      text: process.env.TEXT_MAIL_BODY,
      html: process.env.TEXT_MAIL_HTML,
      body: data.comment
    })
  }
}