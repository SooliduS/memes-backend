const jwt = require('jsonwebtoken');

const rejectJWT = (req , res , next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const accessToken = authHeader.split(' ')[1]
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.id = decoded.userInfo.id;
            req.roles = decoded.userInfo.roles;
            req.username =decoded.userInfo.username;
            next();
        }
    );
}
module.exports = rejectJWT