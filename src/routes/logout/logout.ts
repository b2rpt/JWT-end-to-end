import type { Request, Response } from 'express';
const logout = (req: Request, res: Response) => {
  res.send('this is logout page');
};
export default logout;
