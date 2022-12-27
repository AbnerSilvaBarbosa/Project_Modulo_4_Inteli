const mqtt = require('mqtt');

var options = {
    host: '210c91749efc49e9a28a2ddfd1b73711.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'IPTracker',
    password: 'iptTracker'
}

let newSSIDs = {"ssid": [], "rssi": []};

function getRoom(array) {
    array.ssid.map(async (each, index) => {
        if(each[0] == "e" && each[1] == "s" && each[2] == "p") {
            newSSIDs.ssid.push(each);
            newSSIDs.rssi.push(array.rssi[index]);
        }
    })

    if (newSSIDs.ssid.length > 1) {
        const max = Math.max(...newSSIDs.rssi);
        const index = newSSIDs.rssi.indexOf(max)
        let location = newSSIDs.ssid[index].split("-")[1]
        location = location.split("_")
        const room = location[0]
        const building = location[1]

        return(`O objeto está localizado na sala ${room} do prédio ${building}`)
    } else {
        let location = newSSIDs.ssid[0].split("-")[1]
        location = location.split("_")
        const room = location[0]
        const building = location[1]

        return(`O objeto está localizado na sala ${room} do prédio ${building}`)
    }
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Conexão com o broker realizada com sucesso');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //console.log('Received message:', topic, message.toString());
    if(topic == "localESP") {
        const infos = JSON.parse(message)

        console.log(getRoom(infos))

        newSSIDs = {"ssid": [], "rssi": []}
    }
});

// subscribe to topic 'my/test/topic'
client.subscribe('localESP');

async function publish(topic, message) {
    client.publish(topic, message);
}

module.exports = {
    publish
}