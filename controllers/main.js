const jwt = require('jsonwebtoken')
const {BadRequest} = require('../errors')
const login = async (req,res)=>{
    const {username, password} = req.body
    //validating username and password
    if(!username || !password){
        throw new BadRequest('Please provide email and password')
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
    
   
const luckyNumber = Math.floor(Math.random()*100)
res.status(200)
   .json({
 msg:`Hey ${req.user.username},`,
 secret:`Your lucky number is ${luckyNumber}`  
})

}

module.exports = {
    login,dashboard
}