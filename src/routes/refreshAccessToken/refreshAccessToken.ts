import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN,
} from '../../const/const.ts';
import {
  getToken,
  verifyToken,
} from '../../lib/hashed-password/tokens/tokens.ts';
import User from '../../models/User.ts';

const refreshAccessToken = async (req, res) => {
  //validate req 1st alwyas
  const refreshToken = req?.cookies?.refreshToken;

  try {
    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh token missing' });
    }

    const { userId } = await verifyToken(refreshToken, REFRESH_TOKEN);

    if (!userId) {
      return res.status(403).json({ message: 'Refresh token invalid' });
    }

    const {_id} = await User.findOne({  _id:userId}).select('_id');
    if (!_id) {
        return res.status(403).json({ message: 'user not exist' });
      }

    const accessToken = getToken({userId:_id}, ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY);
    if (!accessToken) {
      return res
        .status(500)    
        .json({ message: 'issue while cresting acces token' });
    }

    res
      .status(200)
      .json({ msg: `user ${userId} acces tocken refreshed`, accessToken });
  } catch (err) {
    console.log('err', err);
    return new Error(`err ${err}`);
  }
};

export default refreshAccessToken;
