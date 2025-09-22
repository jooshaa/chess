import bcrypt from 'bcrypt'
import  config  from 'config'

const salt = config.get("salt")

export function hashPass(pass) {
    return bcrypt.hashSync(pass, salt)
}

export function compareHash(hashPass, newPass) {
    return bcrypt.compareSync(newPass, hashPass)
}
