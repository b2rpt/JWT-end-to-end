import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../../const/const.ts';

const saltRound = SALT_ROUND;

const getHashedPassword = async (plainTextPassword) => {
  try {
    return await bcrypt.hash(plainTextPassword, saltRound);
  } catch (err) {
    throw new Error(err);
  }
};

const verifyPassword = async (plainTextPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (err) {
    throw new Error(err);
  }
};

export { getHashedPassword, verifyPassword };
