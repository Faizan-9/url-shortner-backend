const jwt = require('jsonwebtoken')


exports.authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization
        console.log(header)

        if(!header || !header.startsWith("Bearer ")){
            return res.status(403).json({success : false, message : "Unauthorized Access"})
        }

        const token = header.split(" ")[1]
        console.log(token)
        
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
       console.log(decoded)

        req.user = decoded;

        
        next();
    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong", error: error.message})
    }
}