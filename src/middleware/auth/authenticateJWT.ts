import jwt from 'jsonwebtoken';
import type { Response, Request, NextFunction } from 'express';
import { SECRET_TOKEN } from '../../const/const.ts';
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let { headers, user } = req;
  const token = headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('token not found');
  }
  jwt.verify(token, SECRET_TOKEN, (err, userData) => {
    if (err) {
      return res.status(403).send(`invalid token, ${err}`);
    }
    user = userData;
    next();
  });
};
export default authenticateJWT;
