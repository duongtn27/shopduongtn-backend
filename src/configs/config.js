'use strict'

const dev = {
    app: {
        port: process.env.DEV_PORT || 3000
    },
    db: {
        host: process.env.DB_DEV_HOST || 'localhost',
        port: process.env.DB_DEV_PORT || 27017,
        name: process.env.DB_DEV_NAME || 'shopduongtn'
    }
}

const product = {
    app: {
        port: process.env.PRO_PORT || 3000
    },
    db: {
        host: process.env.DB_PRO_HOST || 'localhost',
        port: process.env.DB_PRO_PORT || 27017,
        name: process.env.DB_PRO_NAME || 'shopduongtn'
    }
}
const config = { dev, product }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]