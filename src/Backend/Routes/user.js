const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");

const userController = require("../controllers/user");

const AuthMiddleware = require("../Middlewares/Auth");

/**
 * @swagger
 * tags:
 *  name: Usuário
 *  description: API Usuário
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuário:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - pass
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         pass:
 *           type: string
 *           description: Senha do usuário
*/

/**
 * @swagger
 * /User/Register/:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuário]
 *     description: Através de algumas informações, um novo usuário é registrado no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuário'
 *     responses:
 *      '200':
 *         description: O usuário criado
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuário'
*/

//Criação de usuário
router.post(
    "/Register",
    [body("name", "Nome é necessário").exists({ checkFalsy: true })],
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    [body("pass", "Senha é necessário").exists({ checkFalsy: true })],
    userController.register
);

/**
 * @swagger
 * /User/Login/:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuário]
 *     description: Através de algumas informações, um usuário é autenticado no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               pass:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *      '200':
 *         description: O usuário foi Autenticado
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   token:
 *                     type: string
 *                     description: Token de autenticação
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *      '500':
 *         description: O usuário não foi autenticado
 *         content:
 *            text/plain:
 *              schema:
 *                type: string
 *                example: Email ou Senha inválidos
*/

//Login de usuário
router.post(
    "/Login",
    [body("email", "Email é necessário").exists({ checkFalsy: true })],
    [body("pass", "Senha é necessário").exists({ checkFalsy: true })],
    userController.Login
);

/**
 * @swagger
 * /User/Infos/:
 *   get:
 *     summary: Pega a informação de um usuário específico
 *     tags: [Usuário]
 *     description: Através do token do usuário, o sistema encontra as informações do mesmo
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *           example: Bearer ${token}
 *         required: true
 *         description: Token do usuário
 *     responses:
 *      '200':
 *         description: Retorna as informações do usuário
 *         content:
 *            plain/text:
 *              schema:
 *                $ref: '#/components/schemas/Usuário'
 *      '500':
 *         description: O usuário não foi autenticado
 *         content:
 *            text/plain:
 *              schema:
 *                type: string
 *                example: Token inválido
*/

router.get(
    "/Infos",
    AuthMiddleware.unsureAuthenticated,
    userController.Infos
);

//Exporta o ROUTER
module.exports = router;
