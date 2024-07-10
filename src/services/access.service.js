'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./key-token.service")
const { createTokenPair } = require("../utils/access.util")
const { getInfoData } = require("../utils/index.util")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signup = async ({ name, email, password }) => {
        try {
            const existedShop = await shopModel.findOne({ email }).lean()
            if (existedShop) {
                return {
                    code: '400',
                    message: 'Shop existed',
                }
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name,
                email,
                password: hashedPassword,
                roles: [RoleShop.SHOP]
            })

            if (newShop) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if (!publicKeyString) {
                    return {
                        code: '500',
                        message: 'Create key token failed'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString)

                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKeyString,
                    privateKey
                )
                console.log(tokens)

                return {
                    code: '201',
                    metadata: {
                        shop: getInfoData({
                            fields: ['_id', 'name', 'email'],
                            object: newShop
                        }),
                        tokens
                    }
                }
            }

            return {
                code: '200',
                metadata: null
            }
        } catch (error) {
            return {
                code: '500',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService