'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _SECONDS = 5000

const checkOverload = () => {
    setInterval(() => {
        const numberConnections = mongoose.connections.length
        const cpus = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        const maxConnections = cpus * 5

        console.log(`Number of connections: ${numberConnections} - Max connections: ${maxConnections}`)
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

        if (numberConnections > maxConnections) {
            console.log('Server is overloaded')
        }
    }, _SECONDS)
}

module.exports = checkOverload