const sequelize = require('../config/db.js')
const { DataTypes } = require('sequelize')


// export 
const Player = sequelize.define('player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(72),
        allowNull: false
    },
    birth_year:{
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1200
    },
    country: {
        type: DataTypes.STRING(100),
    }

},
    {
        timestamps: true,
        freezeTableName: true

    })

    module.exports = Player
