import express from 'express'
import morgan from 'morgan'
import { expressjwt } from 'express-jwt';
import router from './routes';
import config from './config';

const app = express();

app.use(morgan('dev'))

app.use(
  expressjwt({
    secret: config.jwt.jwtSecret || "hello",
    algorithms: ["HS256"],
    getToken: (req) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return;
    },
  }).unless({
    path: ['/api/authorize', '/api/login']
  })
)

app.use('/api', router)

export default app