const pool = require('../config/db')

exports.createUser = async (user) => {
    try {
        const {name, email, password} = user
        const [result] = await pool.query(`INSERT INTO users (name ,email ,password) VALUES (?,?,?)`,[name,email,password])
        return result[0]
    } catch (error) {
        console.log(error)
    }
}

exports.findByEmail = async (email) => {
  
    try {
        const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
       
        return result[0]
    } catch (error) {
        console.log(error)
    }
}
 
exports.saveRefreshToken = async (email, refreshToken) =>{
    try {
        const [result] = await pool.query(`UPDATE users SET refresh_token = ? WHERE email = ?`,[refreshToken, email])
        return result
    } catch (error) {
        console.log(error)
        
    }
}

exports.clearRefreshToken = async(refresh_token) => {
    try {
        const result = await pool.query(`UPDATE users SET refresh_token = null WHERE refresh_token = ?`,[refresh_token])
        return result
    } catch (error) {
        console.log(error)
    }
}

exports.findByRefreshToken = async (refresh_token) => {
    try {
        const [result] = await pool.query(`SELECT * FROM users WHERE refresh_token = ?`[refresh_token])
        return result
    } catch (error) {
        console.log(error)
    }
}