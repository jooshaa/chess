const sequelize = require('../config/db.js')
const { DataTypes, Sequelize } = require('sequelize')
const Tournament = require('./tournament.js')
const Player = require('./player.js')


// export 
const Tournament_player = sequelize.define('tournament_player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    initial_rating: {
        type: DataTypes.INTEGER
    },
    score:{
        type: DataTypes.DECIMAL
    },
    rank: {
        type: DataTypes.INTEGER,
    }
},
    {
        timestamps: true,
        freezeTableName: true

    })

    Tournament.hasMany(Tournament_player)
    Tournament_player.belongsTo(Tournament)

    Player.hasMany(Tournament_player)
    Tournament_player.belongsTo(Player)

    module.exports = Tournament_player
