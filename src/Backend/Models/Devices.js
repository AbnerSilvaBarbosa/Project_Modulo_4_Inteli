const mongoose = require('mongoose');
const Schema = mongoose.Schema

// const actualData = new Date().toUTCString()

const PatrimonioSchema = new Schema({
    patrimonioId: {
        type: String,
        id: true,
        index: true,
        description: "Id Unico de Patrimonio"
    },

    name: {
        type: String,
        description: "Nome do Patrimonio"
    },

    sala: {
        type: Number,
        description: "Sala do Patrimonio"
    },

    predio: {
        type: Number,
        description: "Predio do Patrimonio"
    },

    historico: {
        type: String,
        description: "Historico do Patrimonio"
    },

    batery: {
        type: Number,
        description: "Nivel de bateria do Patrimonio"
    },

    macAddress: {
        type: String,
        description: "Mac Address do Patrimonio"
    },

    created_at: {
        type: String,
        description: "Data de criação do Patrimonio"
    },

    updated_at: {
        type: String,
        description: "Data de criação do Patrimonio"
    },
})

const Patrimonio = mongoose.model('Patriminio', PatrimonioSchema);
module.exports = Patrimonio