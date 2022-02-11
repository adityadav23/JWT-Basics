const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization

    //validating authHeader
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
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
    throw new UnauthenticatedError('Not authorized to access this route')

    }

}

module.exports = authMiddleware
