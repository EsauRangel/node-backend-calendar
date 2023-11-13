const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, creatEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos")
const { isDate } = require("../helpers/isDate")

router.use(validarJWT);

router.get("/", getEventos);

router.post("/", [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es requerida").custom(isDate),
    check("end", "La fecha de finalizacion es requerida").custom(isDate),
    validarCampos
], creatEvento);

router.put("/:id", [], actualizarEvento);
router.delete("/delete/:id", [], eliminarEvento);

module.exports = router;