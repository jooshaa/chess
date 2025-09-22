import express from 'express'
import config from 'config'
// import { errorMessage, successMessage } from './helper/succ_err_helper/succ_err.js'
import { sequelize } from './config/db.js'
import {router} from './routes/users.js'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use('/user', router)
app.use(cookieParser())


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