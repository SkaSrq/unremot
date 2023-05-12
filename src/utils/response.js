const successResponse = (req, res, data, code) =>
  res.send({
    code,
    data,
    success: true,
  });
const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
module.exports = {
  errorResponse: errorResponse,
  successResponse: successResponse,
};
