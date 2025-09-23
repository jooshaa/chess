// import { User } from "../models/user.js";
// import { errorMessage, successMessage } from "../helper/succ_err_helper/succ_err.js";
// import { compareHash, hashPass } from "../utils/bcrypt.js";
// import { newOtp } from "./otp.main.js";
// import { decode } from "../helper/crypt.js";
// import { Otp } from "../models/otp.js";
// import { JwtService } from "../utils/jwt.js";
const User  = require('../models/user.js')
const {errorMessage, successMessage} = require("../helper/succ_err_helper/succ_err.js")
const {hashPass, compareHash} = require("../utils/bcrypt.js")
const newOtp = require("./otp.main.js")
const {decode } = require('../helper/crypt.js')
const Otp = require("../models/otp.js")
const JwtService = require("../utils/jwt.js")


function getTokenPayload(user) {
    return { id: user.id, email: user.email, role: user.role }
}
const register = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return errorMessage(res, "not found", 400, "error")
        }
        const candidate =await User.findOne({ where: { email } })
        
        
        if (candidate) {
            return errorMessage(res, "user already exists", 400, "error")
        }
        
        
        
        await newOtp(req.body)
        return successMessage(res, 200, "Code sent")
    } catch (err) {
        errorMessage(res, err, 500, "error in register")
    }


}


 const authentication = async (req, res) => {
    try {
        const { otp } = req.body

        const body = await Otp.findOne({ where: { otp } })
        if (!body) {
            return errorMessage(res,
                "Error",
                401,
                "Inccorrect or expired code")
        }
        const decodedValue = JSON.parse(await decode(body.encodedValue))
        const { password } = decodedValue
        //hash procedure
        const hashedPasswrod = hashPass(password)
        decodedValue.password = hashedPasswrod
        const newStudent = await User.create(decodedValue)

        const payload = getTokenPayload(newStudent)

        //need return tokens access refresh
        const tokens = JwtService.generateTokens(payload)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
        })
        successMessage(res, 201, "you are registered", tokens.accessToken)
    } catch (error) {
        errorMessage(res, error, 500, "Error")
    }
}
 const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const body = await User.findOne({ where: { email } })
        const unhashedPass = compareHash(body.password, password,)

        if (!body || !email || !password) {
            return errorMessage(res, "password or email wrong", 400, "Error in logging")
        }
        if (!unhashedPass) {
            return errorMessage(res, "password or email wrong", 404, "Error in logging")
        }
        if (email != body.email) {
            return errorMessage(res, "password or email wrong", 401, "Error in logging")
        }
        //not tested yet
        const payload = getTokenPayload(body)
        const tokens = JwtService.generateTokens(payload)
        

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
        })
        successMessage(res, 200, "you are logged", tokens.accessToken)
    }
    catch (error) {
        errorMessage(res, error, 500, error.message)
    }
}

 const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
        })
        return successMessage(res, 200, "You are logged out")
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in logout")
    }
}

module.exports = {logout, login, authentication, register}