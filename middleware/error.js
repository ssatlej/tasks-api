import HttpStatus from "http-status-codes";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";
//   if (err.name === "CastError") {
//     const message = `Resource Not Found. Invalid: ${err.path}`;
//     err = new Error(message, 400);
//   }

  res.status(err.statusCode).json({
    success: false,
    code: err.statusCode,
    message: err.message,
    status: HttpStatus.getReasonPhrase(err.statusCode),
  });
};
