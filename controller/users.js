
// import { User } from "../models/user.js";
// import { errorMessage, successMessage } from "../helper/succ_err_helper/succ_err.js";
// import { hashPass } from "../utils/bcrypt.js";

const User = require('../models/user.js')
const {errorMessage, successMessage} = require("../helper/succ_err_helper/succ_err.js")
const {hashPass} = require("../utils/bcrypt.js")

 const createUser = async (req, res) => {
    if (!req.body) {
        return errorMessage(res, "body not found", 404, "error")
    }
    try {

        const candidate = await User.findOne({ where: { email: req.body.email } })
        if (candidate) return errorMessage(res, "User already exists", 409, "Validation error");
        const body = req.body


        const hashedPass = await hashPass(body.password)
        body.password = hashedPass
        console.log(body)
        const newUser = await User.create(body)
        return successMessage(res, 201, "Created", newUser)

    } catch (err) {
        return errorMessage(res, err, 500, "Error in creation")
    }

}

 const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return successMessage(res, 200, "found", users)
    } catch (err) {
        return errorMessage(res, err, 500, "Error in getting")
    }
}

 const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!user) return errorMessage(res, "User not found", 404, "Not found");
       
        return successMessage(res, 200, "User found", user);
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in getting");
    }
};

 const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) {
            return errorMessage(res, "user not exists", 400, "Validation error")
        }
        if (req.body.email) {
            const candidate = await User.findOne({ where: { email: req.body.email } })
            if (candidate) {
                errorMessage(res, "User already exists", 409, "Validation error");
            }
        }
        if (req.body.password) req.body.password = hashPass(req.body.password)

        await user.update(req.body)
        await user.save()

        return successMessage(res, 200, "updated", user);

    } catch (err) {
        return errorMessage(res, err, 400, "error in updating")
    }
}


 const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return errorMessage(res, "Not found", 404, "Not found");

        await user.destroy();
       
        return successMessage(res, 200, " deleted");

    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in deleting ");
    }
};

module.exports = {createUser,getAllUsers,updateUser,getUserById,deleteUser}