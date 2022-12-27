const { validationResult } = require('express-validator')
const buzzer = require('../services/buzzer')
require('express-async-errors')

const Buzzer = new buzzer.Buzzer()

const ligarBuzzer = async (req, res) => {
    //Pega as infos da requisição
    const { topic } = req.params
    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    try {
        //Tratamento das respostas do método da classe
        const result = await Buzzer.ligarBuzzer(topic);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const desligarBuzzer = async (req, res) => {
    //Pega as infos da requisição
    const { topic } = req.params
    //Valida se algum paremetro é inválido
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.errors[0].msg,
        })
    }

    try {
        //Tratamento das respostas do método da classe
        const result = await Buzzer.desligarBuzzer(topic);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


//Exporta as funções do controller para o ROUTER
module.exports = {
    ligarBuzzer,
    desligarBuzzer
}