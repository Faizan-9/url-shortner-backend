const express = require('express')
require('dotenv').config()
require('./config/db')
const cors = require('cors')
const urlRoutes = require('./routes/urlRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended : true}))

const authRoutes = require('./routes/authRoutes')

app.use("/api/auth", authRoutes)
app.use("/api/url",urlRoutes)

app.listen(process.env.PORT, () =>{
    console.log(`Server has started at http://localhost:${process.env.PORT}`)

})
