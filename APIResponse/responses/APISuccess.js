const
    APIResponseInterface = require('../APIResponseInterface');

class APISuccess extends APIResponseInterface {
    constructor(response) {
        super(response);
        this.setStatus(200);
        this.setSuccess(this.response.payload);
    }
}

module.exports = APISuccess;