import jwt from 'jsonwebtoken';

const getToken = (payload, secretTokenKey, expiresIn) => {
  try {
    return jwt.sign(payload, secretTokenKey, { expiresIn: expiresIn });
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (token, secretTokenKey) => {
  return await jwt.verify(token, secretTokenKey, (err, decodedData) => {
    if (err) {
      return new Error(`Invalid token ${err}`);
    } else {
      return decodedData;
    }
  });
};

export { getToken, verifyToken };
