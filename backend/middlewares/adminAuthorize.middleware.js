const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const adminAuthorize = async (req,res,next) =>{
    try{
        const {role} = await UserServiceInstance.getRole(req.user.roleId);
        if(role === "admin")
            next();
        else
            return res.status(403).json({message : "You are not authorized to access this resource."})
    }catch(err){
        res.status(500).json({message : "Something went wrong"})
    }
};

module.exports = adminAuthorize;