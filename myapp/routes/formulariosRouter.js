const express = require('express')
const router = express.Router()
const FormularioController = require("../controllers/FormularioController")

// Buscar
router.get('/paginar', function (req, res, next) {
    FormularioController.getPage(req, res, next)
})

// Buscar Permisos
router.get('/rol/:id/permisos', function (req, res, next) {
    FormularioController.getPermisos(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    FormularioController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    FormularioController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    FormularioController.delete(req, res, next)
});

module.exports = router