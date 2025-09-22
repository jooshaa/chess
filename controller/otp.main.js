// const addMinustesToDate = require("../helper/add_minutes")//
import { addMinustesToDate } from "../helper/add_minutes"
// const { successMessage, errorMessage } = require("../helper/send.Err_Suc")
import { successMessage, errorMessage } from "../helper/succ_err_helper/succ_err"
// const Otp = require("../models/otp")
import { Otp } from "../models/otp"
// const sendMail = require("../utils/nodemailer")
import { sendMail } from "../utils/nodemailer"
// const { generate_otp } = require("../utils/otp_create_verify")
import { generate_otp } from "../utils/otp_create_verify"
// const cleanOtp = require("../helper/clean.otp")
import { cleanOtp } from "../helper/clean.otp"

// const { encode } = require("../helper/crypt")
import { encode } from "../helper/crypt"



export const newOtp = async (values) => {
    try {
        const now = new Date()
        const expiration_time = addMinustesToDate(now, 3)
        const otp = generate_otp()
        
        await sendMail(values.email, otp)
        const encodedValue = await encode(JSON.stringify(values))
                

        const newOtpRow = await Otp.create({ otp, expiration_time, encodedValue })
        cleanOtp(newOtpRow, expiration_time)

    //    return successMessage(res, 201, "Otp saved")
    }
    catch (error) {
        console.error(error)
    //    return errorMessage(res, error, 400, "error in saving otp")
    }
}

// const otp_verify = async (values)

