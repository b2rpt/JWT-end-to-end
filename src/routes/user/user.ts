import type { Request, Response } from 'express';
import User from '../../models/User.ts';
const user = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const user = await User.find({ _id:id }).select('-password');
  if (user) {
    res.status(200).send({ user });
  }
};
export default user;
