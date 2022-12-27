const {publish} = require("../mqtt.js")
require('dotenv').config();


class Buzzer {
    async ligarBuzzer(topic) {
        try {
            publish(topic, "1");
            return "Informação enviada";
        } catch (err) {
            throw new Error(`Informação não enviada, pelo erro: ${err}`);
        }
    }

    async desligarBuzzer(topic) {
        try {
            publish(topic, "0");
            return "Informação enviada";
        } catch (err) {
            throw new Error(`Informação não enviada, pelo erro: ${err}`);
        }
    }
}

module.exports = {
    Buzzer,
}