
class Users {


    constructor() {
        this.users = [];
    };

    // Create a new user.
    setUser( id, name, room ) {
        let person = { id, name, room };
        this.users.push( person );
    };

    // Get a user.
    getUser(id) {

        const user = this.users.filter( person => person.id === id )[0];
        return user;
    };

    // Get users.
    getUsers() {
        return this.users;
    };

    // Get users by room.
    getUsersByRoom(room) {
        let users = this.users.filter( user => user.room === room);
        return users;
    };


    // Delete a user.
    deleteUser(id) {

        const deletedUser = this.getUser(id);
        this.users = this.users.filter( person => person.id !== id)
        return deletedUser;
    };

}

module.exports = {
    Users,
};