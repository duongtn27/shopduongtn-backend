'use strict'
const { Schema, SchemaTypes, model } = require("mongoose")

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

const keyTokenSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'Shop',
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)