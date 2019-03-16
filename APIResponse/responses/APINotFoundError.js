const
    IS_NODE_DEV = process.env.NODE_ENV === "dev",
    uuid4 = require('uuid/v4'),
    APIResponseInterface = require('../APIResponseInterface');

class APINotFoundError extends APIResponseInterface {
    constructor(response) {
        super(response);
        const
            errorId = uuid4();
        try {
            const
                error = this.response.payload;
            this.setStatus(404);
            console.error("ERROR ID:", errorId);
            console.error(error);
            this.setError({
                errorId: errorId,
                message: IS_NODE_DEV ? error.message : "Not Found",
                body: IS_NODE_DEV ? error.stack.split('\n') : {}
            });
        } catch (e) {
            this.setStatus(500);
            this.setError({
                errorId: errorId,
                message: IS_NODE_DEV ? e.message : "Server Error",
                body: IS_NODE_DEV ? e.stack.split('\n') : {}
            });
        }
    }
}

module.exports = APINotFoundError;