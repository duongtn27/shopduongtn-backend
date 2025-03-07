'use strict'

const AccessService = require('../services/access.service')

class AccessController {
    signup = async (req, res) => {
        try {
            return res.status(201).json(await AccessService.signup(req.body))
        } catch (error) {
            return error
        }
    }
}

module.exports = new AccessController()