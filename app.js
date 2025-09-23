// import express from 'express'
// import config from 'config'
// // import { errorMessage, successMessage } from './helper/succ_err_helper/succ_err.js'
// import { sequelize } from './config/db.js'
// import {router} from './routes/index.router.js'
// import cookieParser from 'cookie-parser'
const router = require('./routes/index.router')
const express = require('express')
const cookieParser = require('cookie-parser')
const config =require('config')
const sequelize  = require('./config/db')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)



const PORT = config.get('port')?? 3030

const start = async () => {
    try {
        sequelize.authenticate()
        console.log("connected to db")

        sequelize.sync()
        console.log("synchrolized to db")

        app.listen(PORT, ()=>{
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

//  errorMessage(res, error, 500, "Internal server error")