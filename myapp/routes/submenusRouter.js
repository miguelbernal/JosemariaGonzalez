const express = require('express')
const router = express.Router()
const SubmenuController = require("../controllers/SubmenuController")

// Buscar
router.get('/paginar', function (req, res, next) {
    SubmenuController.getPage(req, res, next)
})

// Get One
router.get('/:id', function (req, res, next) {
    SubmenuController.getOne(req, res, next)
})

// Agregar
router.post('', function (req, res, next) {
    SubmenuController.insert(req, res, next)
});

// Modificar
router.put('/:id', function (req, res, next) {
    SubmenuController.update(req, res, next)
});

// Eliminar
router.delete('/:id', function (req, res, next) {
    SubmenuController.delete(req, res, next)
});

module.exports = router
