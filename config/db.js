const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

(async () =>{
    try {
        const connection = await pool.getConnection()
        console.log("My SQL has connected successfully")
    } catch (error) {
        console.log(error.message)
    }
})()

module.exports = pool;