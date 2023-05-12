const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require("../models/User");
const CustomError = require('../utils/error');
const Sequelize = require('sequelize');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
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
const loginService = async(username, password )=>{
    try {
        const user = await User.findOne({ where: { username } });
    
        if (!user) {
          throw new CustomError('User not found',404);
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new CustomError('Incorrect password',401);
        }
    
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    
        return token;
      } catch (error) {
        if (error instanceof CustomError) {
            throw error;
          }
          throw new CustomError("Internal Server Error",500)
      }
};
module.exports = {createUserService: createUserService,loginService:loginService};