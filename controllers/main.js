const jwt = require('jsonwebtoken')
const { startsWith } = require('lodash')
require('dotenv').config()
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res)=>{
    const {username, password} = req.body
    //validating username and password
    if(!username || !password){
        throw new CustomAPIError('Please provide email and password',400)
    }
    //demo id, usually provide by db
    const id = new Date().getDate()

    const token = jwt.sign({id, username},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
        )

    res.status(200).json({
        msg:"token created",
        token
    })
}

const dashboard = async (req,res)=>{
    
    const authHeader = req.headers.authorization

    //validating authHeader
    if(!authHeader || !authHeader,startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)
    }

    //fetch token from authHeader
    const token = authHeader.split(' ')[1]

    //verifying token using secret_key
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const luckyNumber = Math.floor(Math.random()*100)
            res.status(200)
             .json({
         msg:`Hey ${decoded.username},`,
         secret:`Your lucky number is ${luckyNumber}`
     })
    }catch(error){
        throw new CustomAPIError('Not authorized to access this route',401)
    }

    
}

module.exports = {
    login,dashboard
}