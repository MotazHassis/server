
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    messageContent: {
        type: String,
        required: [
            true,
            "Title is required"
        ],
        minlength: [3, 'Name must be more than 3 charachters!!'],
    },senderid:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }}
    ,{ timestamps: true });
const Message = mongoose.model('Message', MessageSchema);


const UserSchema = new Schema({
    username: {
        type: String,
        required: [
            true,
            "Title is required"
        ],
        minlength: [3, 'Name must be more than 3 charachters!!']
    },
    password: {
        type: String,
        required: [
            true,
            "Title is required"
        ],
        minlength: [3, 'password must be more than 3 charachters!!'],
    },
    email: {
        type: String,
        required: [
            true,
            "Title is required"
        ],
        minlength: [3, 'email must be more than 3 charachters!!'],
    },
    messages: [MessageSchema]
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
module.exports ={User,Message,MessageSchema,UserSchema}
