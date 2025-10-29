const NotFound = (req, res, next) => {
  res.status(404);
  res.json({
    error: "Not Found",
    message: "La risorsa non esiste",
  });
};
module.exports = NotFound;
