const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const buzzerController = require("../controllers/buzzer");

/**
 * @swagger
 * tags:
 *  name: Buzzer
 *  description: Buzzer API
*/


/**
 * @swagger
 * /Buzzer/ligar/{patrimonioId}:
 *   get:
 *     summary: Liga o buzzer do dispositivo
 *     tags: [Buzzer]
 *     description: Através do ID de patrimônio, o buzzer do dispositivo é ligado, quando esta rota é chamada
 *     parameters:
 *       - in: path
 *         name: patrimonioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de patrimônio do dispositivo
 *     responses:
 *      '200':
 *         description: Buzzer ligado
 *         content:
 *            plain/text:
 *              schema:
 *                type: string
 *                example: Informação enviada
*/

//Criar registro de palestra e todos os alunos que participaram
router.get(
    "/ligar/:topic",
    [param("topic", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    buzzerController.ligarBuzzer
);

/**
 * @swagger
 * /Buzzer/desligar/{patrimonioId}:
 *   get:
 *     summary: Desliga o buzzer do dispositivo
 *     tags: [Buzzer]
 *     description: Através do ID de patrimônio, o buzzer do dispositivo é desligado, quando esta rota é chamada
 *     parameters:
 *       - in: path
 *         name: patrimonioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de patrimônio do dispositivo
 *     responses:
 *      '200':
 *         description: Buzzer Desligado
 *         content:
 *            plain/text:
 *              schema:
 *                type: string
 *                example: Informação enviada
*/

router.get(
    "/desligar/:topic",
    [param("topic", "ID de Patrimonio é necessário").exists({ checkFalsy: true })],
    buzzerController.desligarBuzzer
);

//Exporta o ROUTER
module.exports = router;
