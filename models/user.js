// import {sequelize }from "../config/db.js";
// import { DataTypes } from "sequelize"
const sequelize = require('../config/db.js')
const { DataTypes } = require('sequelize')


// export 
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(72),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(82),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(10),
        defaultValue: "user"
    }

},
    {
        timestamps: true,
        freezeTableName: true

    })

    module.exports = User
