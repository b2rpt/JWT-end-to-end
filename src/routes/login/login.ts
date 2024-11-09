import type { Request, Response } from 'express';
import User from '../../models/User.ts';
import { verifyPassword } from '../../lib/hashed-password/hashed-password.ts';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
} from '../../const/const.ts';
import { getToken } from '../../lib/hashed-password/tokens/tokens.ts';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingEmailUser = await User.findOne({ email });

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

  const accessToken = getToken(payload, ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
  const refreshToken = getToken(payload, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY);
  const option = {
    httpOnly: true,
    secure: true,
  };

  await User.findByIdAndUpdate(_id, { $set: { refreshToken } });
  return res
    .status(200)
    .cookie('refreshToken', refreshToken, option)
    .json({ msg: `user ${_id} logged in successfully`, accessToken });
};

export default login;
