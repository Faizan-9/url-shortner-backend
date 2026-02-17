const pool = require('../config/db')
const {nanoid} = require('nanoid')

exports.getAllUrls =async (user_id)=>{
    try {
        const result = await pool.query(`SELECT * FROM urls_practise WHERE user_id=? ORDER BY id DESC`, [user_id])
        return result[0]
    } catch (error) {
        console.log(error)
    }
}

exports.createShortUrls = async (long_url, user_id) =>{
    try {
        const shortUrl = nanoid(5)
        const [result] = await pool.query(`INSERT INTO urls_practise (user_id, short_url, long_url) VALUES(?, ?,?)`,[user_id, shortUrl ,long_url])
        return { 
            id: result.insertId,
            short_url: shortUrl,
            long_url,
            clicks: 0

        }
    } catch (error) {
        console.log(error)
    }
}

exports.getLongUrlByShortUrl = async (short_url) =>{
    try {
        const [result] = await pool.query(`SELECT long_url FROM urls_practise WHERE short_url=?`,[short_url])
        return result
    } catch (error) {
        console.log(error)
    }
}

exports.getClicks = async (short_url) => {
    try {
        const [result] = await pool.query(`SELECT clicks FROM urls_practise WHERE short_url=?` , [short_url])
        return result[0].clicks
    } catch (error) {
        console.log(error.message)
    }
}

exports.updateClicks = async (short_url, clicks) => {
    try {
        const result = await pool.query('UPDATE urls_practise SET clicks = ? WHERE short_url = ?', [clicks, short_url])
        return result
    } catch (error) {
        console.log(error)
    }
}