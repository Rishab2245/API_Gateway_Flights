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
        const bearerHeader = req.headers["authorization"];
        console.log(req.headers);
        if(typeof bearerHeader !== 'undefined'){
            bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
            req.token = bearerToken;
            
        }else{
            throw new appError("bearer token not found",StatusCodes.FORBIDDEN);
        }
        const response = await UserService.isAuthenticated(req.token);
        if(response){
            req.user = response;
            next();
        }
    } catch (e) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json(e)
    }

}
module.exports = {
    validateAuthRequest,
    checkAuth,
}