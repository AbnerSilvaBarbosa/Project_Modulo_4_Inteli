const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const deviceController = require("../controllers/device");


//Criar registro de palestra e todos os alunos que participaram
router.post(
    "/teste",
    deviceController.teste
);

//Criar registro de palestra e todos os alunos que participaram
router.post(
    "/createDevice",
    [body("patId", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("deviceName", "Nome do Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("deviceSala", "Sala do Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("devicePredio", "Prédio do Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("deviceBattery", "Bateria do Patrimonio é necessário").exists({ checkFalsy: true })],
    deviceController.createDevice
);
router.post(
    "/getHistory",
    [body("patId", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    deviceController.getHistory
);

router.get(
    "/getPredioSalasEquipamentos",
    deviceController.getPrediosSalasEquipamentos
);

//Rota - equipamentos registrados
router.get(
    "/equipamentosRegistrados", 
    deviceController.getEquipamentosRegistrados
)

// Rota - predios registrados
router.get(
    "/getPredios",
    deviceController.getPredios
)

router.post(
    "/getSalas",
    [body("number", "Num. da sala é necessário").exists({ checkFalsy: true })],
    deviceController.getSalas
)

router.post(
    "/getEquipamentoSala", 
    [body("predio", "Prédio é necessário").exists({ checkFalsy: true })],
    [body("sala", "Sala é necessária").exists({ checkFalsy: true })],
    deviceController.getEquipamentoSala
)

router.get(
    "/infosDevice/:patId",
    [param("patId", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    deviceController.getInfosDevice
)

router.put(
    "/updateDevice",
    [body("patId", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("deviceName", "Nome do Patrimonio é necessário").exists({ checkFalsy: true })],
    [body("macAddress", "MacAddress do Patrimonio é necessário").exists({ checkFalsy: true })],
    deviceController.updateDevice
)

router.delete(
    "/deleteDevice/:macAddress",
    [param("macAddress", "MacAddress do Patrimonio é necessário").exists({ checkFalsy: true })],
    deviceController.deleteDevice
)


//Exporta o ROUTER
module.exports = router;
