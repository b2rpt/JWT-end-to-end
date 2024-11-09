import jwt from 'jsonwebtoken';
import type { Response, Request, NextFunction } from 'express';
import { ACCESS_TOKEN } from '../../const/const.ts';
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let { headers, cookies } = req;
  const token = headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send('token not found');
  }

  jwt.verify(token, ACCESS_TOKEN, (err, userData) => {
    if (err) {
      return res.status(403).send(`invalid token, ${err}`);
    }
    req.user = userData;
    next();
  });
};
export default authenticateJWT;
