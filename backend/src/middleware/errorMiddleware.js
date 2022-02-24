// Error handler that runs in between req -> res
const errorHanlder = (err, req, res, next) => {

    // sets value if error is there else error 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    return res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}
module.exports = { errorHanlder }