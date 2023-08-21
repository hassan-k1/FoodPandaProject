function authenticate(req, res, next) {
  console.log(req.headers);
  const beare = req.headers["authorization"];
  if (typeof beare !== "undefined") {
    const bearer = beare.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(402).json({
      error: "token is not valid",
    });
  }
}

module.exports = {
  authenticate,
};
