'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1h'
        })
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })

        jwt.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.log('error: ', err)
            } else {
                console.log('decoded: ', decoded)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {

    }
}

module.exports = {
    createTokenPair
}