import * as jwt from 'jsonwebtoken'
import { User } from '../types/User'

export const signUserJWT = (user: User) => {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '2d'
  })
}