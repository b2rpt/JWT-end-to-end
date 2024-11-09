import { Router } from 'express';
import login from './login/login.ts';
import logout from './logout/logout.ts';
import register from './register/register.ts';
import user from './user/user.ts';
import authenticateJWT from '../middleware/auth/authenticateJWT.ts';
import refreshAccessToken from './refreshAccessToken/refreshAccessToken.ts';

const router = Router();

router.use('/login', [], login);
router.use('/logout', [], logout);
router.use('/register', [], register);
router.use('/refresh-access-token', [], refreshAccessToken);
router.use('/user/:id', [authenticateJWT], user);

export default router;
