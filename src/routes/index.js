'use strict'

const express = require('express')
const { apiKey, permission } = require('../middlewares/api-key.middleware')
const router = express.Router()

router.use(apiKey)
router.use(permission('0000'))

router.use('/v1/api', require('./access'))

module.exports = router