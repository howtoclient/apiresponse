const Response = require('./Response');

class APIResponseInterface {
    constructor(response) {
        if (!(response instanceof Response)) {
            response = new Response(response);
        }
        this._response = response;
        this.status = 0;
        this.data = null;
        this.error = null;
        this.success = false;
    }

    setStatus(status) {
        this.status = parseInt(status) || 0;
    }

    setError(error) {
        this.error = error;
        this.data = null;
        this.success = false;
    }

    setSuccess(data) {
        this.error = null;
        this.data = data;
        this.success = true;
    }

    get response() {
        return this._response;
    }

}

module.exports = APIResponseInterface;