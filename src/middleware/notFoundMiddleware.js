const notFoundMiddleware = (req, res) => {
  return res.status(404).json({ massage: "Not Found" });
};

module.exports = notFoundMiddleware;
