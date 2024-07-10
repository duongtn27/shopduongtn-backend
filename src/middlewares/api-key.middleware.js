'use strict'

const { findById } = require('../services/api-key.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers[HEADER.API_KEY]
        if (!apiKey) {
            return res.status(403).json({ message: 'Forbidden Error' })
        }

        const objKey = await findById(apiKey)
        if (!objKey) {
            return res.status(403).json({ message: 'Forbidden Error' })
        }

        req.objKey = objKey
        return next()
    } catch (error) {

    }
}

const permission = (permission) => {
    return async (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({ message: 'Forbidden Error' })
        }

        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({ message: 'Forbidden Error' })
        }

        return next()
    }
}

module.exports = {
    apiKey,
    permission
}