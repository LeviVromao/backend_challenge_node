import { config } from "dotenv"
config()

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length > 5 && email.length < 125
}

const TEST_TOKENS = ["test-token", "valid-captcha-token"] // como é só um desafio eu coloquei essas senhas fracas para teste

async function handleRecaptchaValidation(token: string) {
  const secretKey = process.env.RECAPTCHA_KEY
  const url = process.env.RECAPTCHA_URL
  if (TEST_TOKENS.includes(token)) {
    return true
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await res.json()
  return data.success;
}

export {
    isValidEmail,
    handleRecaptchaValidation
}