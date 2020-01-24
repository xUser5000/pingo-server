const { authorize } = require('../../service/auth/authorize/authorize.service')

const { HttpError } = require('../../service/error/HttpError')

const tokenAuthorizer = (req, res, next) => {

    const token = req.headers['x-auth-token']

    try {
        const uid = authorize(token)
        req.uid = uid
        next()
    } catch (e) {
        if (e instanceof HttpError) res.status(e.code).send({ errors: [e.message] })
        else res.status(500).send({ errors: ['Internal server error'] })
    }
}

module.exports.tokenAuthorizer = () => tokenAuthorizer