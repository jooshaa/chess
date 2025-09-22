import {Sequelize} from "sequelize";
import  config   from "config";

export const sequelize = new Sequelize(
    config.get("db_name"),
    config.get("db_username"),
    config.get("db_password"),
    
    {
        host: config.get('db_host'),
        port: config.get('db_port'),
        dialect: 'postgres',
        logging: false
    }
    
)
