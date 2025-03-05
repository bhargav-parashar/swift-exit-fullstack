const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        role: { type : String}
    },
    {
        timestamps:true
    }

);

const roleModel = mongoose.model("Role",roleSchema,"roles");

module.exports = roleModel;