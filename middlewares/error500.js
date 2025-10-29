const ServerError = (err, req, res, next) => {
  console.error("SERVER ERROR", err);
  res.status(500);
  res.json({
    error: "Internal Server Error",
    message: "qualcosa è andato storto nel server",
  });
};

module.exports = ServerError;
