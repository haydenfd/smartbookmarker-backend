import { randomBytes } from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const config = {
  app: {
    port: process.env.PORT,
    appUrl: process.env.APP_URL
  },
  twitterApi: {
    loginState: randomBytes(50).toString('hex'),
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET
  }
}

export default config