const crudRepository = require ('./crud-Repository');
const { User } = require('../models');

class UserRepository extends crudRepository {
    constructor(){
        super(User);
    }

    async getUserByEmail(email){
        const user = await User.findOne({ where : { email: email }});
        return user;
    }
}
module.exports = UserRepository;