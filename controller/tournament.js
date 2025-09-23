

const Tournament = require('../models/tournament.js')
const { errorMessage, successMessage } = require("../helper/succ_err_helper/succ_err.js")


const createTournament = async (req, res) => {
    if (!req.body) {
        return errorMessage(res, "body not found", 404, "error")
    }
    try {

        const candidate = await Tournament.findOne({ where: { name: req.body.name } })
        if (candidate) return errorMessage(res, "Tournament already exists", 409, "Validation error");
        const body = req.body


        // const hashedPass = await hashPass(body.password)
        // body.password = hashedPass
        // console.log(body)
        const newTournament = await Tournament.create(body)
        return successMessage(res, 201, "Created", newTournament)

    } catch (err) {
        return errorMessage(res, err, 500, "Error in creation")
    }

}

const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.findAll()
        return successMessage(res, 200, "found", tournaments)
    } catch (err) {
        return errorMessage(res, err, 500, "Error in getting")
    }
}

const getTournamentById = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!tournament) return errorMessage(res, "Tournament not found", 404, "Not found");

        return successMessage(res, 200, "Tournament found", tournament);
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in getting");
    }
};

const updateTournament = async (req, res) => {
    try {
        const { id } = req.params
        const tournament = await Tournament.findByPk(id)
        if (!tournament) {
            return errorMessage(res, "tournament not exists", 400, "Validation error")
        }
        // if (req.body.email) {
        //     const candidate = await Tournament.findOne({ where: { email: req.body.email } })
        //     if (candidate) {
        //         errorMessage(res, "Tournament already exists", 409, "Validation error");
        //     }
        // }
        // if (req.body.password) req.body.password = hashPass(req.body.password)

        await tournament.update(req.body)
        await tournament.save()

        return successMessage(res, 200, "updated", tournament);

    } catch (err) {
        return errorMessage(res, err, 400, "error in updating")
    }
}


const deleteTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findByPk(id);
        if (!tournament) return errorMessage(res, "Not found", 404, "Not found");

        await tournament.destroy();

        return successMessage(res, 200, " deleted");

    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in deleting ");
    }
};

module.exports = { createTournament, getAllTournaments, updateTournament, getTournamentById, deleteTournament }