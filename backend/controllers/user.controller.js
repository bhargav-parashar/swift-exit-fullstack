const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

//CREATE RESIGNATION
const resign = async (req,res) =>{
    try{
        const newResignation = await UserServiceInstance.resign(req.user._id, req.body.lwd);
        const body = {  
            data : {
                resignation : {
                    _id : newResignation._id
                }
            }
        };
        res.status(200).json(body);
    }catch(err){
        res.status(500).send({ message: "Resignation submission failed!", err });
    }
};

const submitResponse = async (req,res) =>{
    try{
        const body = {
            userId : req.user._id,
            responses: req.body.responses
        };
        const newResponse = await UserServiceInstance.submitResponse(body);
        res.status(200).send();
    }catch(err){
        res.status(500).send({ message: "Response submission failed!", err });
    }
};

const questionnaire = async (req,res) =>{
    try{
        const allQuestions = await UserServiceInstance.getQuestions();
        res.status(200).send(allQuestions);
    }catch(err){
        res.status(500).send({ message: "Response submission failed!", err });
    }
};

const getResignationByUserId = async (req, res) =>{
    try{
        const resignation = await UserServiceInstance.getResignationByUserId(req.user._id);
        res.status(200).json(resignation);
    }catch(err){
        res.status(500).json({message:"Failed to fetch resignation", err});
    }
}

module.exports = {resign,submitResponse,questionnaire,getResignationByUserId};