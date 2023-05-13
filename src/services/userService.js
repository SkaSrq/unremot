const User = require("../models/User");
const CustomError = require("../utils/error");
const getUserService = async(id)=>{  
    try {
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) {
            throw new CustomError('User not found',404);
          }
          return user;
    } catch (error) {
        throw new CustomError("Internal Server error");
    }

};

module.exports = {getUserService:getUserService};