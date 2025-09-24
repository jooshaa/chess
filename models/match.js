const sequelize = require('../config/db.js')
const { DataTypes, Sequelize } = require('sequelize')
const Tournament = require('./tournament.js')
const Player = require('./player.js')


// export 
const Match = sequelize.define('match', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    round_number: {
        type: DataTypes.DECIMAL(8, 2)
    },
    board: {
        type: DataTypes.INTEGER
    },
    result: {
        type: DataTypes.INTEGER
    },
    result_reported_by: {
        type: DataTypes.INTEGER
    },
    result_reported_at: {
        type: DataTypes.TIME,
        defaultValue: Sequelize.literal('CURRENT_TIME')
    }
},
    {
        timestamps: true,
        freezeTableName: true

    })

Tournament.hasMany(Match)
Match.belongsTo(Tournament)

Player.hasMany(Match, { foreignKey: "player1Id", as: "player1", onDelete: "CASCADE" })
Match.belongsTo(Player, { foreignKey: 'player1Id', as: 'player1', onDelete: "CASCADE"})

Player.hasMany(Match, { foreignKey: "player2Id", as: "player2", onDelete: "CASCADE" })
Match.belongsTo(Player, { foreignKey: 'player2Id', as: 'player2', onDelete: "CASCADE" })

module.exports = Match
