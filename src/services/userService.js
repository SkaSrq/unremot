const bcrypt = require('bcrypt');
const User = require("../models/User");
const CustomError = require('../utils/error');
const Sequelize = require('sequelize');
const saltRounds = 10;
const createUserService = async(firstName, lastName, username, email, password1 )=>{
      try {
        const hashedPassword = await bcrypt.hash(password1, saltRounds);
        const user = await User.create({
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        });
    
        const {password, ...data} = user.dataValues;
        return data;
      } catch (error) {
          if (error instanceof Sequelize.UniqueConstraintError) {
            throw new CustomError(error.errors[0].message,409)
        }
        throw new CustomError("failed to register",500)
      }
};
const loginService = ()=>{};
module.exports = {createUserService: createUserService,loginService:loginService};