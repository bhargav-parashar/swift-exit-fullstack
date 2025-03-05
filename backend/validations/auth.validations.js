const Joi = require("joi");

const authValidationSchema = Joi.object().keys({
    username: Joi.string().default("").max(50),
    password: Joi.string().required()   
});


module.exports = {authValidationSchema};