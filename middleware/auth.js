const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')
require('dotenv').config()
const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization

    //validating authHeader
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)
    }

    //fetch token from authHeader
    const token = authHeader.split(' ')[1]
    
  //verifying token using secret_key
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const {username, id} = decoded
    req.user = {username, id}
    next()
    }
   catch(error){
    throw new CustomAPIError('Not authorized to access this route',401)
    }

}

module.exports = authMiddleware
