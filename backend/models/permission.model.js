const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
    {
        subject : {type: String, required : true },
        action : {type: String, required : true }
    },
    {
        timestamps: true
    }
)

const permissionModel = mongoose.model("Permission",permissionSchema,"permissions");

module.exports = permissionModel;