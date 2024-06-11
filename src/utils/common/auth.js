const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config');

function checkPassword(planePassword , encryptedPassword){
 try{
    return bcrypt.compareSync(planePassword, encryptedPassword);
 }catch(e){
    throw e;
 }
}

function createToken(input){
        try{
            const jwtToken = jwt.sign({data:input}, ServerConfig.JWT_SECRET , { expiresIn: ServerConfig.JWT_EXPIRY });
            return jwtToken;
        }catch(e){
            throw e;
        } 
}

function verifyToken(token){
    try {console.log("Verifying");
        const decoded = jwt.verify(token, ServerConfig.JWT_SECRET );
        console.log("de:",decoded);
        return decoded;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken,
}