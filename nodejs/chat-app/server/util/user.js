class User{
    constructor(){
        this.users = [];        
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return this.users;
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((us) => user.id != id);
        }
        return user;
    }

    getUserRoom(room){
        return this.users.filter((user)=> user.room === room);
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id);
    }

}

module.exports = {User};