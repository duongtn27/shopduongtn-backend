'use strict'

const mongoose = require('mongoose')
const config = require('../configs/config')

const connectString = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })
        mongoose.connect(connectString, {
            maxPoolSize: 50
        })
            .then(_ => console.log('Connected to MongoDB'))
            .catch(_ => console.log('Failed to connect to MongoDB'))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instance = Database.getInstance()
module.exports = instance