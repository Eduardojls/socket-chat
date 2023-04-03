
const createMessage = ( name, message ) => {

    return {
        name,
        message,
        date: new Date()
    };
};

module.exports = {
    createMessage
};