import type { Request, Response } from 'express';
import User from '../../models/User.ts';
import { getHashedPassword } from '../../lib/hashed-password/hashed-password.ts';

const register = async (req: Request<any>, res: Response<any | string>) => {
  try {
    //schema validation
    const { displayName, email, password, mobile } = req.body;

    const existingEmailUser = await User.findOne({ email });
    const existingMobileUser = await User.findOne({ mobile });

    if (existingEmailUser) {
      return res.status(400).send('Email already exist');
    }
    if (existingMobileUser) {
      return res.status(400).send('Mobile already exist');
    }

    const newUser = new User({
      displayName,
      email,
      password: await getHashedPassword(password),
      mobile,
    });

    const saveUser = await newUser.save();
    return res.status(200).json(saveUser._id);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Error creating user', error });
  }
};
export default register;
