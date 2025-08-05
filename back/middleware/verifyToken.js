const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key"; // TODO: Move to .env file

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ msg: "Access denied." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token." });
    }
};

module.exports = verifyToken;
