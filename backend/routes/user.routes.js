const router = require("express").Router();
const {resign, submitResponse, questionnaire, getResignationByUserId} = require("../controllers/user.controller");
const jwtAuthorize = require("../middlewares/authorizeJwt.middleware");
const {validateSchema} = require("../middlewares/validate.middleware");
const {userValidationSchema,responsesValidationSchema} = require("../validations/user.validations");
const {dateValidation} = require("../middlewares/dateValidation.middleware");

router.post("/resign", jwtAuthorize, validateSchema(userValidationSchema), dateValidation, resign);
router.post("/responses", jwtAuthorize, validateSchema(responsesValidationSchema), submitResponse );
router.get("/questionnaire", questionnaire);
router.get("/resignation",jwtAuthorize,getResignationByUserId);

module.exports = router;

