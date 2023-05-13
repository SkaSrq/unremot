const userService = require("../services/userService");
const CustomError = require("../utils/error");
const Response = require("../utils/response");

const jwtSecret  = process.env.JWT_SECRET;

const getUserController = async(req,res)=>{
    try {
        const { id } = req.user;
        const user = await userService.getUserService(id);
        return Response.successResponse(req,res,user,200);
    } catch (error) {
        console.log(error);
        if(error instanceof CustomError){
            return Response.errorResponse(req,res,error.message,error.statusCode,error);
        }
        return Response.errorResponse(req,res,"Internal Server Error",500,{});
    }
};

module.exports = {getUserController:getUserController};