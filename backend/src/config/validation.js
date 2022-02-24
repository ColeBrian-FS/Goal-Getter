class Validation {

    // Checks if its not Blank
    notBlank = (statusCode, data, msg, res) => {
        // checks if text is not blank 
        if (!data) {
            res.status(statusCode)
            throw new Error(msg)
        }

    }
    comparingIds = (statusCode, x_id, y_id, msg, res) => {
        // checks login user matches goal user 
        if (x_id !== y_id) {
            res.status(statusCode)
            throw new Error(msg)
        }
    }
}
module.exports = new Validation()