const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    name : {type:String ,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type: String,enum: ['student', 'teacher'],default: 'student', },
}, { timestamps: true }
)

module.exports = mongoose.model('User', newUser);
