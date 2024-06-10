const { StatusCodes} = require('http-status-codes');
const { errorResponse } = require('../utils/common');
const { appError } = require('../utils');
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

module.exports = {
    validateAuthRequest
}