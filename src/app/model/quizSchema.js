const mongoose = require("mongoose");
const participant = new mongoose.Schema ({
    name:String,
    score:Number
})
export const questionSchema = new mongoose.Schema({
    question:String,
    options:[String],
    answer:[String]
})
const quizSchema = new mongoose.Schema({
    createdBy:String,
    questions:[questionSchema],
    participants:[participant]
})

export default mongoose?.models?.Quiz || mongoose.model("Quiz",quizSchema)

