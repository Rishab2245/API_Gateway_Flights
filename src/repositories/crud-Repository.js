const {printlogger} = require('../config');
const { appError} = require('../utils');
const {StatusCodes} = require('http-status-codes');
class crudRepository {
    constructor(model){
        this.model = model;
    }
    async create(data){
            console.log(data);
            const response = await this.model.create(data);
            return response;
        
    }
    async destroy(data){
        
            const response = await this.model.destroy({
                where : {
                    id:data
                }
            });
            if(!response){
                throw new appError("Not able to find the resource",StatusCodes.NOT_FOUND);
            }
            return response;
        
    }
    async get(data){
        
            const response = await this.model.findByPk(data);
            if(!response){
                throw new appError("Not able to find the resource",StatusCodes.NOT_FOUND);
            }
            return response;
        
    }
    async getAll(){
        
            const response = await this.model.findAll();
            return response;
        
    }
    async update(id,data){
        
            const response = await this.model.update(
                data,
                {
                    where : {
                        id:id
                    }
                }
            );
            if(!response[0]){
                throw new appError("Not able to find the resource",StatusCodes.NOT_FOUND);
            }
            
            return response;
       
    }
}

module.exports = crudRepository;