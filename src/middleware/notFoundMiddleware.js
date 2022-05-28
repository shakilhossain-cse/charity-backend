const notFoundMiddleware = (req, res) => {
  return res.status(404).json({ message: "Not Found" });
};

module.exports = notFoundMiddleware;
