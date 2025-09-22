// import bcrypt from 'bcrypt'
// import  config  from 'config'
const bcrypt  = require("bcrypt")
const config  = require("config")

const salt = config.get("salt")
//export
 function hashPass(pass) {
    return bcrypt.hashSync(pass, salt)
}
//export 
function compareHash(hashPass, newPass) {
    return bcrypt.compareSync(newPass, hashPass)
}
module.exports = {
    hashPass, 
    compareHash
}