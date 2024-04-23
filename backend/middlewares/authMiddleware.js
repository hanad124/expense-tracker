const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userid = decodedId._id;
    next();
  } catch (error) {
    res.status(500).send({ message: "Invalid or Expired Token" });
  }
};
