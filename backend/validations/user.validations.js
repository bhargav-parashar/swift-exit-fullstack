const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
      lwd : Joi.string()
});

const responseValidationSchema = Joi.object().keys({
      questionId : Joi.string(),
      questionText : Joi.string(),
      response :Joi.string()
});
const responsesValidationSchema = Joi.object().keys({
      userId:Joi.string(),
      responses : Joi.array().items(responseValidationSchema)
})



module.exports = {userValidationSchema,responsesValidationSchema};