const { UserRepository} = require('../repositories');
const userRepository = new UserRepository();
const { StatusCodes} = require('http-status-codes');
const {appError} = require('../utils');
const {Auth} = require('../utils/common');
const {ServerConfig} = require('../config');
const user = require('../models/user');
async function createUser(data){
    try{
        // console.log(data);
        const user = await userRepository.create(data);
        return user;
    }catch(e){ 
        console.log(e);
        if(e.name == 'SequelizeValidationError' || e.name == "SequelizeUniqueConstraintError"){
            let explanation = [];
            e.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new appError(explanation , StatusCodes.BAD_REQUEST)
            }
        
        if(e.name == 'TypeError'){
            throw new appError("Cannot create a new airplane object" , StatusCodes.INTERNAL_SERVER_ERROR);
        }
         
        throw e;

    }
}

async function signIn(data){
   try {
    const user = await userRepository.getUserByEmail(data.email);
    if(!user){
        throw new appError("no user found for the given email", StatusCodes.NOT_FOUND);
    }
    const passwordMatch = Auth.checkPassword(data.password , user.password);
    if(!passwordMatch){
        throw new appError("invalid password", StatusCodes.BAD_REQUEST);
    }
    const jwt = Auth.createToken({id : user.id , email : user.email});
    const jwtBearerToken = "Bearer "+jwt;
    return jwtBearerToken;
   } catch (e) {
    if(e instanceof appError) {
        throw e;
    }
     console.log(e);
     throw new appError("someting went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function isAuthenticated(token){
   
   try {
        if(!token){
        throw new appError("MISSING JWT Token",StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.data.id);
        if(!user){
            throw new appError("No User found",StatusCodes.NOT_FOUND);
        }
        return user.id;

   } catch (e) {
    if(e instanceof appError) {
        throw e;
    }
    if(e.name == "JsonWebTokenError"){
        throw new appError("invalid JWT Token",StatusCodes.BAD_REQUEST);
    }
    if(e.name == "TokenExpiredError"){
        throw new appError("JWT Token Expired",StatusCodes.BAD_REQUEST);
    }
     console.log(e);
     throw e;
     
   }

}
module.exports = {
    createUser,
    signIn,
    isAuthenticated,
}