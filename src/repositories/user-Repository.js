const crudRepository = require ('./crud-Repository');
const { User } = require('../models');

class UserRepository extends crudRepository {
    constructor(){
        super(User);
    }
}
module.exports = UserRepository;