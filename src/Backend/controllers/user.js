const { validationResult } = require('express-validator')
const user = require('../services/user')
require('express-async-errors')

const User = new user.User()

const register = async (req, res) => {
    const { name, email, pass } = req.body;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }


    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await User.register(name, email, pass);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const Login = async (req, res) => {
    const { email, pass } = req.body;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await User.Authentication(email, pass);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const Infos = async (req, res) => {
    const { id } = req;

    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    //Chamada para o service
    try {
        //Tratamento das respostas do método da classe
        const result = await User.getInfos(id);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//Exporta as funções do controller para o ROUTER
module.exports = {
    register,
    Login,
    Infos
}