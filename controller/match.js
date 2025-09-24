

const Match = require('../models/match.js')
const { errorMessage, successMessage } = require("../helper/succ_err_helper/succ_err.js")


const createMatch = async (req, res) => {
    if (!req.body) {
        return errorMessage(res, "body not found", 404, "error")
    }
    
    try {

        // const candidate = await Match.findOne({ where: { name: req.body.name } })
        // if (candidate) return errorMessage(res, "Match already exists", 409, "Validation error");
        const body = req.body


        // const hashedPass = await hashPass(body.password)
        // body.password = hashedPass
        // console.log(body)
        const newMatch = await Match.create(body)
        return successMessage(res, 201, "Created", newMatch)

    } catch (err) {
        console.log(err)
        return errorMessage(res, err, 500, "Error in creation")
    }

}

const getAllMatchs = async (req, res) => {
    try {
        const matchs = await Match.findAll()
        return successMessage(res, 200, "found", matchs)
    } catch (err) {
        return errorMessage(res, err, 500, "Error in getting")
    }
}

const getMatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!match) return errorMessage(res, "Match not found", 404, "Not found");

        return successMessage(res, 200, "Match found", match);
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in getting");
    }
};

const updateMatch = async (req, res) => {
    try {
        const { id } = req.params
        const match = await Match.findByPk(id)
        if (!match) {
            return errorMessage(res, "match not exists", 400, "Validation error")
        }
        // if (req.body.email) {
        //     const candidate = await Match.findOne({ where: { email: req.body.email } })
        //     if (candidate) {
        //         errorMessage(res, "Match already exists", 409, "Validation error");
        //     }
        // }
        // if (req.body.password) req.body.password = hashPass(req.body.password)

        await match.update(req.body)
        await match.save()

        return successMessage(res, 200, "updated", match);

    } catch (err) {
        return errorMessage(res, err, 400, "error in updating")
    }
}


const deleteMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findByPk(id);
        if (!match) return errorMessage(res, "Not found", 404, "Not found");

        await match.destroy();

        return successMessage(res, 200, " deleted");

    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in deleting ");
    }
};

module.exports = { createMatch, getAllMatchs, updateMatch, getMatchById, deleteMatch }