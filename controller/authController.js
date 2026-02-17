const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const utils = require('../utils/tokenUtils')


exports.signup = async (req,res) =>{
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password){
            return res.status(404).json({message : "Enter all information"})
        }

        const user = await userModel.findByEmail(email)
        if (user){
            return res.status(400).json({success : false, message : "Already singed up, Please login"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.createUser({name, email, password : hashedPassword})
        res.status(201).json({success : true, message : "Signed up successfully"})
    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong", error : error.message})
        
    }
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body

        console.log(email, password)
        if (!email || !password){
            return res.status(400).json({scusess : false, message : "Invalid Credentials"})
        }
        const user = await userModel.findByEmail(email)


        if(!user){
            return res.status(404).json({sucess : false, message : "Please register first"})
        }
        
        const match = await bcrypt.compare(password, user.password)

        if (!match){
            return res.status(400).json({scusess : false, message : "Invalid Credentials"})
        }

        accessToken = await utils.generateAccessToken(user);
        refreshToken = await utils.generateRefreshToken(user);

        console.log(accessToken, refreshToken)

        const result = await userModel.saveRefreshToken(email, refreshToken)
        

        if (result.affectedRows === 0){
            return res.status(400).json({success : false, message : "Something went wrong"})
        }

        res.status(200).json({success : true, message : "Logged in successfully", access_token:accessToken, refresh_token:refreshToken, user: user})

    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong",error:error.message})
        console.log(error)

    }
}

exports.logout = async (req,res) =>{
    try {
        const {refresh_token} = req.body
        const result = await userModel.clearRefreshToken(refresh_token)
        res.status(200).json({success : true, message : "Logged out successfully"})
    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong", error : error.message})
    }
}

exports.access = async (req, res) => {
    try {
        res.status(200).json({success : true, message : "Access Granted"})
    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong", error : error.message})
    }
}

exports.refreshToken = async(req,res) => {
    try {
        const {refresh_token} = req.body 
        const result = await userModel.findByRefreshToken(refresh_token)
        console.log(result)
        const accessToken = await utils.generateAccessToken(result)
        res.status(200).json({success : true, message : "Access Token generates again", access_token : accessToken})
    } catch (error) {
        res.status(500).json({success : false, message : "Something went wrong"})
    }
}