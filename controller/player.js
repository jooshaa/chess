

const Player = require('../models/player.js')
const { errorMessage, successMessage } = require("../helper/succ_err_helper/succ_err.js")


const createPlayer = async (req, res) => {
    if (!req.body) {
        return errorMessage(res, "body not found", 404, "error")
    }
    try {

        const candidate = await Player.findOne({ where: { name: req.body.name } })
        if (candidate) return errorMessage(res, "Player already exists", 409, "Validation error");
        const body = req.body


        // const hashedPass = await hashPass(body.password)
        // body.password = hashedPass
        // console.log(body)
        const newPlayer = await Player.create(body)
        return successMessage(res, 201, "Created", newPlayer)

    } catch (err) {
        return errorMessage(res, err, 500, "Error in creation")
    }

}

const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.findAll()
        return successMessage(res, 200, "found", players)
    } catch (err) {
        return errorMessage(res, err, 500, "Error in getting")
    }
}

const getPlayerById = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!player) return errorMessage(res, "Player not found", 404, "Not found");

        return successMessage(res, 200, "Player found", player);
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in getting");
    }
};

const updatePlayer = async (req, res) => {
    try {
        const { id } = req.params
        const player = await Player.findByPk(id)
        if (!player) {
            return errorMessage(res, "player not exists", 400, "Validation error")
        }
        // if (req.body.email) {
        //     const candidate = await Player.findOne({ where: { email: req.body.email } })
        //     if (candidate) {
        //         errorMessage(res, "Player already exists", 409, "Validation error");
        //     }
        // }
        // if (req.body.password) req.body.password = hashPass(req.body.password)

        await player.update(req.body)
        await player.save()

        return successMessage(res, 200, "updated", player);

    } catch (err) {
        return errorMessage(res, err, 400, "error in updating")
    }
}


const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByPk(id);
        if (!player) return errorMessage(res, "Not found", 404, "Not found");

        await player.destroy();

        return successMessage(res, 200, " deleted");

    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in deleting ");
    }
};

module.exports = { createPlayer, getAllPlayers, updatePlayer, getPlayerById, deletePlayer }