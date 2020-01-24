const { authorize } = require('../../service/auth/authorize/authorize.service')

const { HttpError } = require('../../service/error/HttpError')

const tokenAuthorizer = async (req, res, next) => {

    const token = req.headers['x-auth-token']

    try {
        const uid = await authorize(token)
        req.uid = uid
        next()
    } catch (e) {
        /* istanbul ignore else */
        if (e instanceof HttpError) res.status(e.code).send({ errors: [e.message] })
        else res.status(500).send({ errors: ['Internal server error'] })
    }
}

module.exports.tokenAuthorizer = () => tokenAuthorizer