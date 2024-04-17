
// track logged in users and their sockets

let users = {}
const addUser=(userId, socket)=>{
    users[userId] = socket
}

const removeUser=(userId)=>{
    return delete users[userId]
}
const getUserSocket=(userId)=>{
    if(users.hasOwnProperty(userId))
        return users[userId]
    else
        return undefined
}
const printAllActiveUsers=()=>{
    console.log('active users: ', users)
}


module.exports={addUser, removeUser, getUserSocket, printAllActiveUsers}

 