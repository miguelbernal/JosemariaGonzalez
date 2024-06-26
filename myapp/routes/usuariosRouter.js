const express = require('express')
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

// Login
router.post('/login', async (req, res, next) => {
    UsuarioController.login(req, res, next)
})

// Buscar
router.get('/paginar', function (req, res, next) {
    UsuarioController.getPage(req, res, next)
})

// Get One
router.get('/:id', function (req, res, next) {
    UsuarioController.getOne(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    UsuarioController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    UsuarioController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    UsuarioController.delete(req, res, next)
});

module.exports = router