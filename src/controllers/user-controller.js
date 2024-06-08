const {UserService} = require('../services');
const { StatusCodes} = require ('http-status-codes');
const { successResponse , errorResponse } = require('../utils/common')
/*
POST : /signup
req-body {
    email
    password
}
*/
async function signUp(req,res){
    try{
        user = await UserService.createUser({
            email:req.body.email,
            password:req.body.password
        })
        successResponse.message = "User is created succcessfully"
        successResponse.data = user;
        
        return res.status(StatusCodes.CREATED)
                  .json(successResponse);
    }catch(err){
      errorResponse.error = err;
      errorResponse.message = "something went wrong while creating user";

        return res.status(err.statusCode)
                  .json(errorResponse);
    }
}

module.exports = {
    signUp
}