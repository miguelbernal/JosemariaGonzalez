const express = require('express')
const router = express.Router()
const PermisoController = require("../controllers/PermisoController")

// Buscar por roles
router.get('/buscar/rol', async (req, res, next) => {
    PermisoController.getRol(req, res, next)
});

module.exports = router

