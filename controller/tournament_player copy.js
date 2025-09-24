

const Tournament_player = require('../models/tournament_player.js')
const { errorMessage, successMessage } = require("../helper/succ_err_helper/succ_err.js")


const createTournament_player = async (req, res) => {
    if (!req.body) {
        return errorMessage(res, "body not found", 404, "error")
    }
    
    try {

        // const candidate = await Tournament_player.findOne({ where: { name: req.body.name } })
        // if (candidate) return errorMessage(res, "Tournament_player already exists", 409, "Validation error");
        const body = req.body


        // const hashedPass = await hashPass(body.password)
        // body.password = hashedPass
        // console.log(body)
        const newTournament_player = await Tournament_player.create(body)
        return successMessage(res, 201, "Created", newTournament_player)

    } catch (err) {
        console.log(err)
        return errorMessage(res, err, 500, "Error in creation")
    }

}

const getAllTournament_players = async (req, res) => {
    try {
        const tournament_players = await Tournament_player.findAll()
        return successMessage(res, 200, "found", tournament_players)
    } catch (err) {
        return errorMessage(res, err, 500, "Error in getting")
    }
}

const getTournament_playerById = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament_player = await Tournament_player.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!tournament_player) return errorMessage(res, "Tournament_player not found", 404, "Not found");

        return successMessage(res, 200, "Tournament_player found", tournament_player);
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in getting");
    }
};

const updateTournament_player = async (req, res) => {
    try {
        const { id } = req.params
        const tournament_player = await Tournament_player.findByPk(id)
        if (!tournament_player) {
            return errorMessage(res, "tournament_player not exists", 400, "Validation error")
        }
        // if (req.body.email) {
        //     const candidate = await Tournament_player.findOne({ where: { email: req.body.email } })
        //     if (candidate) {
        //         errorMessage(res, "Tournament_player already exists", 409, "Validation error");
        //     }
        // }
        // if (req.body.password) req.body.password = hashPass(req.body.password)

        await tournament_player.update(req.body)
        await tournament_player.save()

        return successMessage(res, 200, "updated", tournament_player);

    } catch (err) {
        return errorMessage(res, err, 400, "error in updating")
    }
}


const deleteTournament_player = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament_player = await Tournament_player.findByPk(id);
        if (!tournament_player) return errorMessage(res, "Not found", 404, "Not found");

        await tournament_player.destroy();

        return successMessage(res, 200, " deleted");

    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in deleting ");
    }
};

module.exports = { createTournament_player, getAllTournament_players, updateTournament_player, getTournament_playerById, deleteTournament_player }