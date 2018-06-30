class AccessError extends Error{
    constructor(message){
        super(message);
    }
}

module.exports=AccessError;