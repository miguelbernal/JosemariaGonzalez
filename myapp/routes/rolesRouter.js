const express = require('express')
const router = express.Router()
const RolController = require("../controllers/RolController")

// Buscar
router.get('/paginar', function (req, res, next) {
    RolController.getPage(req, res, next)
})

// Get One
router.get('/:id', function (req, res, next) {
    RolController.getOne(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    RolController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    RolController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    RolController.delete(req, res, next)
});

module.exports = router
