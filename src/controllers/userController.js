const Joi = require("joi");
const userService = require("../services/userService");
const response = require("../utils/response");
const customError = require("../utils/error");
const createUserController = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  try {
    const { firstName, lastName, username, email, password } =
      await schema.validateAsync(req.body);
      const userServiceResponse = await userService.createUserService(firstName, lastName, username, email, password);
      return response.successResponse(req,res,userServiceResponse);
  } catch (error) {
    if (error instanceof customError) {
      return response.errorResponse(req, res, error.message, error.statusCode,error);
    }
    return response.errorResponse(req, res, "Bad request", 400, error);
  }
};
const loginController = (req, res) => {};
module.exports = {
  createUserController: createUserController,
  loginController: loginController,
};
