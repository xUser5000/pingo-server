const { HttpError } = require('../../service/error/HttpError')
const { InvalidInputError } = require('../../service/error/InvalidInputError')

/**
 * @description A thin wrapper around services for handling responses and errors
 * @async
 * @param {Service} service The business logic
 * @param {Response} res The response object provided by express
 * @param  {...any} args The service arguments
 */
const controller = async (service, res, ...args) => {
    
    try {
        const result = await service(...args);
        res.send(result)
    } catch (e) {

        if (e instanceof HttpError) {

            if (e instanceof InvalidInputError) {
                return res.status(e.code).send({ errors: JSON.parse(e.message) });
            } else {
                return res.status(e.code).send({ errors: [e.message] });
            }
        } else {

            return res.status(500).send({ errors: ['Internal server error'] });

        }

    }

}