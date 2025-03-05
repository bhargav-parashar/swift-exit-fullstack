const mongoose = require("mongoose");
const  { ObjectId } = require ('mongodb');

const userRoleSchema = new mongoose.Schema(
    {
        userId : { type:  mongoose.Schema.Types.ObjectId },
        roleId : { type:  mongoose.Schema.Types.ObjectId, default :new ObjectId("67a4e1b8f087e933ca2a02b4") }
    },
    {
        timestamps : true
    }
);

const userRoleModel = mongoose.model("UserRole",userRoleSchema,"userroles");

module.exports = userRoleModel; 

