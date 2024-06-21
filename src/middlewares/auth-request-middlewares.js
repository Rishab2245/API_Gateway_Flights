const { StatusCodes} = require('http-status-codes');
const { errorResponse } = require('../utils/common');
const { appError } = require('../utils');
const {UserService} = require('../services');

function validateAuthRequest ( req , res , next){
    if(!req.body.email){
        errorResponse.message = "something went wrong while authenticating user";
        errorResponse.error = new appError(["email is not found in the oncoming request in the correct form"] , StatusCodes.BAD_REQUEST)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse)
        }
    if(!req.body.password){
        errorResponse.message = "something went wrong while authenticating user";
        errorResponse.error = new appError(["password is not found in the oncoming request in the correct form"] , StatusCodes.BAD_REQUEST)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(errorResponse)
        }
    next();
}

async function checkAuth(req,res,next){
    try {
        console.log("req body" , req.body)
        const bearerHeader = req.headers["authorization"];
        // console.log(req.headers);
        if(typeof bearerHeader !== 'undefined'){
            bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
            req.token = bearerToken;
            
        }else{
            throw new appError("bearer token not found",StatusCodes.FORBIDDEN);
        }
        // console.log(req.token);
        const response = await UserService.isAuthenticated(req.token);
        // console.log("res",response);
        req.body.userId = response;
            
        console.log("2no" , req.body)
        next();
        }
        catch (e) {
            console.log(e);
            return res
                .status(StatusCodes.FORBIDDEN)
                .json(e)
    }

}
async function isAdmin(req,res,next){
    try {
        // console.log("isAdmin");
        const response = await UserService.isAdmin(req.userId);
        if(!response){
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message : "User not authorized for this action"})
        }
        next();
    } catch (e) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(e)
    }

}


module.exports = {
    validateAuthRequest,
    checkAuth,
    isAdmin
    
}