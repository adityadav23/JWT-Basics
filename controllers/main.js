const login = async (req,res)=>{
    res.status(200)
    .send('Fake login/Register done.')
}

const dashboard = async (req,res)=>{
    
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200)
     .json({
         msg:'Hey John Doe,',
         secret:`Your lucky number is ${luckyNumber}.`
     })
}

module.exports = {
    login,dashboard
}