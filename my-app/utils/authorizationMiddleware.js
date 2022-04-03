import jwt from 'jsonwebtoken';

const APP_SECRET = process.env.APP_SECRET_KEY;

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET);
}
  
  function getUserId(req, authToken) {
    if (req) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          throw new Error('No token found');
        }
        const { user_id } = getTokenPayload(token);
        return user_id;
      }
    } else if (authToken) {
      const { user_id } = getTokenPayload(authToken);
      return user_id;
    }
  
    throw new Error('Not authenticated');
  }
  
  export {getUserId};
  