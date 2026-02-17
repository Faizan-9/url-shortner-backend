const jwt = require('jsonwebtoken')

exports.generateAccessToken = async(user) => {
    return await jwt.sign({id : user.id, email : user.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

exports.generateRefreshToken = async(user) => {
     return await jwt.sign({id : user.id, email : user.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
     )
}