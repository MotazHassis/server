const { User,Message } = require('../models/chat.model');
const { authenticate } = require('../config/jwt.config')
const { response } = require('express');//test
const jwt = require("jsonwebtoken");



module.exports.listAllMessages = (request, response) => {
    // console.log("Hello")
    Message.find().populate('senderid')
        .then(Message => response.json(Message))
        .catch(err => response.status(400).json(err))
}

module.exports.listAllMessagesio = (request, response) => {
    // console.log("Hello")
    Message.find().populate('senderid')
        .then(Message => response.json(Message))
        .catch(err => response.status(400).json(err))
}

module.exports.logout = (function (req, res){
    res.clearCookie('usertoken');
    res.sendStatus(200);
})
const generateUserToken = (userID) => {
    const payload = {
        id: userID
    };
    
    //using the SECRET_KEY from our .env file
    return jwt.sign(payload, process.env.SECRET_KEY);
}


const attachUserAndToken = (res, userToken, user) => {
    res
    .cookie("usertoken", userToken, {
        httpOnly: true
    })
    // return specific fields only
    .send({_id: user._id, username: user.username, email: user.email,token:userToken});
}

module.exports.login = (async function (req, res){
    const {password,email} = req.body
    const result = await User.findOne({email: email})
    if(result === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // compare the supplied password to the hashed password in the database
 
    if(password!==result.password) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
       
    //generate token for logged in user
    const userToken = generateUserToken(result._id)
    console.log(userToken)
    // send user's data and generated token to client
    attachUserAndToken(res, userToken, result)
})



module.exports.RegisterUser = (request, response) => {
    const {username,password,email} = request.body;
    User.create({
        username,password,email
    })
        .then(User => response.json(User))
        .catch(err => response.status(400).json(err));
}
module.exports.sendmessage = (request, response) => {
    const {userid,messageContent} = request.body;
    Message.create({
        messageContent
    
    })
        .then(thisMessage =>{
            console.log(thisMessage._id)
            return Message.updateOne({ _id: thisMessage._id }, { senderid: userid },{ new: true })
        }).then(Message => response.json(Message))
        .catch(err => response.status(400).json(err));
}
module.exports.findthisuser = (request, response) => {
    console.log(request.params.id)
    User.findById({_id:request.params.id})
        .then(User => response.json(User))
        .catch(err => response.status(400).json(err))
}


