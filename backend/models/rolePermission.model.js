const mongoose = require("mongoose");


const rolePersmissionSchema = new mongoose.Schema(
    {
        permissionId : {type :  mongoose.Schema.Types.ObjectId, required: true},
        roleId : {type : mongoose.Schema.Types.ObjectId, required: true}
    },
    {
        timestamps: true
    }
)

const rolePersmissionModel = mongoose.model("RolePermission",rolePersmissionSchema,"rolepermissions");

module.exports = rolePersmissionModel;