const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();


//CREATE USER
const register = async (req,res) =>{
    try{
        //Hash Password
        const hashedPassword = await AuthServiceInstance.generatePasswordHash(req.body.password);
        const newUser = await UserServiceInstance.create({...req.body, password : hashedPassword});
        const newUserRole = await UserServiceInstance.createUserRole({userId:newUser._id});
        res.status(201).json({message: "User registered successfully"});
     }catch(err){
        res.status(500).send({ message: "Registration failed!", err });
    }
};

const login = async (req,res) =>{
    try{
        //find user by username
        const reqUser = await UserServiceInstance.findByUsername(req.body.username);
        
        if(!reqUser){
            res.status(401).json({ message: "Either username or password is incorrect" });
        }else{
                //validate password
                const isUserValid =await AuthServiceInstance.comparePasswordHash(
                    req.body.password,
                    reqUser.password
                );
               
                if(isUserValid){
                    //get user role
                    const {roleId} = await UserServiceInstance.getUserRoleMapping(reqUser._id);
                    const {role} = await UserServiceInstance.getRole(roleId);
                    //create jwt token
                    const jwtToken = AuthServiceInstance.generateJwt({ userId: reqUser._id });
                    
                    res.status(200)
                    .cookie("remember-token",jwtToken,{
                        maxAge: 15 * 60 * 1000,
                        httpOnly: true,
                        secure:true,
                        sameSite:'None'
                    })
                    .json({
                        token: jwtToken,
                        role : role
                    })
                
            
                }else{
                    res.status(401).json({ message: "Either username or password is incorrect" });
                }
        }
    }catch(err){
        if (err.message === "User not found")
            return res.status(404).send({ message: err.message });
        res.status(500).send({ message: "Something went wrong", err });
    }
}

const logout = (req,res)=>{
    try{
        res.status(200)
        .clearCookie(
            "remember-token",
             {
                httpOnly: true,
                secure:true,
                sameSite:'None'
             }
        )
        .json({message:"Logged Out"})
    }catch(err){
        res.status(500).send({ message: "Something went wrong", err });
    }
   
    
}

const loginstatus = async (req,res) =>{
    try{
         const {roleId} = await UserServiceInstance.getUserRoleMapping(req.user._id);
         const {role} = await UserServiceInstance.getRole(roleId);

        res.status(200).json({
            status : true,
            userId: req.user._id,
            userName:req.user.username,
            role : role
        })
    }catch(err){
        res.status(500).send({ message: "Something went wrong", err });
    }
}


module.exports = {register, login, logout,loginstatus};