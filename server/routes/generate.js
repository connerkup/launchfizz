const express = require('express')
const router = express.Router()

//render the generate page
router.get('/', (req, res) => {
    res.render('pages/generate')
})

module.exports = router
