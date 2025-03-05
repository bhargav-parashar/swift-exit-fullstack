const checkHeader = (req,res,next) =>{
    const ADMIN_KEY = process.env.ADMIN_KEY;
    if(req.headers["authorization"] === ADMIN_KEY)
        next();
    else
        res.status(403).json({message:"My friend, you are not authorized"});
}
module.exports = {checkHeader};