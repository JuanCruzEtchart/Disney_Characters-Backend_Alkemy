const jwt = require("jsonwebtoken");
const config = require("../config.js");

function generateToken(data) {
  return jwt.sign(data, config.secret, { expiresIn: "1h" });
}

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Error al autenticar el token" });
    }

    req.user = decoded;

    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
