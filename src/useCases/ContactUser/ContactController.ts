import { Request, Response } from "express"
import { ContactUseCase } from "./ContactUseCase"

export class ContactController {
  constructor(
    private contactUseCase: ContactUseCase
  ){}

  async handle(request: Request, response:Response): Promise<Response>{
    const {name, mail: email, comment, g_recaptcha_response} = request.body
    try {
      await this.contactUseCase.execute({
        name, 
        email, 
        comment, 
        g_recaptcha_response
      })
      return response.status(201).json()
    } catch (error) {
      const errorObject = JSON.parse(error.message)
      return response.status(errorObject.statusCode).json({
        type: errorObject.type,
        title: errorObject.title,
        detail: errorObject.detail,
        instance: "/api-endpoint"
      })
    }
  }
}