const sequelize = require('../config/db.js')
const { DataTypes } = require('sequelize')


// export 
const Tournament = sequelize.define('tournament', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(72),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM("ended", "pending", "upcoming"),
        defaultValue: "upcoming"
    },
    rounds: {
        type: DataTypes.SMALLINT,
    },
    time_control: {
        type: DataTypes.STRING(100),
    }

},
    {
        timestamps: true,
        freezeTableName: true

    })

    module.exports = Tournament
