import config from './../envconfig';
import * as jwt from 'jsonwebtoken';

const parseAuthToken = (authorization: string) => {
  if (!authorization) {
    return null;
  }
  const authHeader = authorization.split(' ');

  if (authHeader[0].toLowerCase() !== 'bearer') {
    return null;
  }

  const jwtToken = authHeader[1];

  if (!jwtToken) {
    return null;
  }

  return jwtValidation(jwtToken);
};

const jwtValidation = token => {
  try {
    return jwt.verify(token, config.secretKey);
  } catch (err) {
    return null;
  }
};

export default {
  parseAuthToken,
  jwtValidation
};
