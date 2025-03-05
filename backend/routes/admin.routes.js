const router = require("express").Router();
const {getAllResignations, concludeResignation,reviewDetails} = require("../controllers/admin.controller");
const jwtAuthorize = require("../middlewares/authorizeJwt.middleware");
const adminAuthorize = require("../middlewares/adminAuthorize.middleware");
const {dateValidation} = require("../middlewares/dateValidation.middleware");

router.get("/resignations", jwtAuthorize, adminAuthorize, getAllResignations );
router.put("/conclude_resignation", jwtAuthorize, adminAuthorize,dateValidation, concludeResignation ); 
router.get("/exit_responses", jwtAuthorize, adminAuthorize, reviewDetails );

module.exports = router;