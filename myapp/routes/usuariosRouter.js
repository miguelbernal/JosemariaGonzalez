const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

// Login
router.post('/login', async (req, res, next) => {
    UsuarioController.login(req, res, next)
})

module.exports = router