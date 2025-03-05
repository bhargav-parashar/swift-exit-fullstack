const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema(
    {
        question: {type: String, required : true }
    },
    {
        timestamps: true
    }
)

const questionnaireModel = mongoose.model("Questionnaire",questionnaireSchema,"questionnaire");

module.exports = questionnaireModel;