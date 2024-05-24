export class JoiError extends Error {
    constructor(code, status, errors) {
        super()
        this.status = status
        this.code = code
        this.errors = errors
    }

    // Override the toString method to provide a custom string representation
    toString() {
        return JSON.stringify({
            code: this.code,
            status: this.status,
            errors: this.errors,
        })
    }
}

export class ResponseError extends Error {
    constructor(code, status, error) {
        super(error)
        this.status = status
        this.code = code
    }
}
