const logErrors = (err, resquest, response, next) => {
    next(err);
}

const errorHandler = (err, resquest, response, next) => {
    response.status(500).json({
        message: err.message,
        stack: err.stack,
    })
}

const boomErrorHandler = (err, resquest, response, next) => {
    if (err.isBoom) {
        const { output } = err;
        response.status(output.statusCode).json(output.payload)
    }
    else {
        next(err);
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
