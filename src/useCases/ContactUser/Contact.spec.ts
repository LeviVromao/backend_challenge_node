import { handleRecaptchaValidation } from "../../utils/validator"
import request = require('supertest') 
import { app } from '../../index'

let server

beforeAll(() => {
  server = app.listen(4000)
})

afterAll((done) => {
  server.close(done)
})

describe("ReCaptcha Validation", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("Should validate recaptcha correctly", async () => {
    const result = await handleRecaptchaValidation(`valid-captcha-token`)

    expect(result).toBe(true)
  })

  it("Should return false when validation fails", async () => {
    const result = await handleRecaptchaValidation(`invalid-captcha-token`)

    expect(result).toBe(false)
  })
})

describe("Contact Controller", () => {
  it("should return 400 when the name is empty", async () => {
    const missingNameData = {
      name: '',
      mail: 'CALABRESO@example.com',
      comment: 'This is a test comment',
      g_recaptcha_response: 'valid-captcha-token',
    }

    const response = await request(server)
      .post('/contact')
      .send(missingNameData)
      .set('Content-Type', 'application/json')
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.objectContaining({
      type: 'about:blank',
      title: 'BadRequestError',
      detail: 'The name is empty',
      instance: '/api-endpoint',
    }))
  })

  it("Should return 400 if the email is not valid", async () =>{
    const missingNameData = {
      name: 'FAKE_NATTY',
      mail: 'invalidEmailexample.com',
      comment: 'This is a test comment',
      g_recaptcha_response: 'valid-captcha-token',
    }

    const response = await request(server)
      .post('/contact')
      .send(missingNameData)
      .set('Content-Type', 'application/json')
    
    expect(response.status).toBe(400)
    expect(response.body).toEqual(expect.objectContaining({
      type: 'about:blank',
      title: 'BadRequestError',
      detail: 'The email is invalid',
      instance: '/api-endpoint',
    }))
  })
})