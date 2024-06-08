const { UserRepository} = require('../repositories');
const userRepository = new UserRepository();
const { StatusCodes} = require('http-status-codes');
const {appError} = require('../utils');
async function createUser(data){
    try{
        console.log(data);
        const user = await userRepository.create(data);
        return user;
    }catch(e){ 
        console.log(e);
        throw new appError("Cannot create a new user object" , StatusCodes.INTERNAL_SERVER_ERROR);  

    }
}

module.exports = {
    createUser
}