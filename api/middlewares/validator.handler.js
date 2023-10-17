const boom = require("@hapi/boom");

const validatorHandler = (schema, property) => {
    return (request, response, next) => {
        //property puede ser por body, params, query
        const data = request[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = { validatorHandler };
