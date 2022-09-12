const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    
    let token = req.headers["access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" + err.message });
        }
        req.userId = decoded.id;
        next();
    });
};
