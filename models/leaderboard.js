const sequelize = require('../config/db.js')
const { DataTypes } = require('sequelize')
const Tournament = require('./tournament.js')


// export 
const Leaderboard = sequelize.define('leaderboard', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    points: {
        type: DataTypes.DECIMAL(8,2)
    },
    wins: {
        type: DataTypes.INTEGER
    },
    draws: {
        type: DataTypes.INTEGER
    },
    losses:{
        type: DataTypes.INTEGER
    },
    rank: {
        type: DataTypes.INTEGER,
    }
},
    {
        timestamps: true,
        freezeTableName: true

    })

    Tournament.hasMany(Leaderboard)
    Leaderboard.belongsTo(Tournament)

    module.exports = Leaderboard
