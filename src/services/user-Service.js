const { UserRepository} = require('../repositories');
const userRepository = new UserRepository();
const { StatusCodes} = require('http-status-codes');
const {appError} = require('../utils');
const {Auth} = require('../utils/common');
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
    return jwt;
   } catch (e) {
    if(e instanceof appError) {
        throw e;
    }
     console.log(e);
     throw new appError("someting went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

module.exports = {
    createUser,
    signIn
}