class AuthenticationError extends Error{
    constructor(message){
        super(message);
    }
}

module.exports=AuthenticationError;