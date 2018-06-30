class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors || null;
    }
}

module.exports = ValidationError;