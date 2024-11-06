import type { Request, Response } from 'express';
import UserModel from '../../models/userModel.ts';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../../lib/hashed-password/hashed-password.ts';
import { SECRET_TOKEN } from '../../const/const.ts';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingEmailUser = await UserModel.findOne({ email });

  if (!existingEmailUser) {
    return res.status(400).send('email or password is not correct');
  }

  const { _id, password: hashedPassword } = existingEmailUser;
  const isPasswordValid = await verifyPassword(password, hashedPassword);

  if (!isPasswordValid) {
    return res.send(400).send('email or password is not correct');
  }

  const payload = {
    userId: _id,
  };

  const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1h' });
  return res.status(200).json({ msg: `user ${_id} logged in successfully`, token });
};

export default login;
