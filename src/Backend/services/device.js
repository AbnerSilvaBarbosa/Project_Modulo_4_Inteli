require("dotenv").config();
const mongoose = require("mongoose");

let newSSIDs = { ssid: [], rssi: [] };

async function getRoom(array) {
  if (array.ssid == "" || array.rssi == "") {
    return {
      room: 404,
      building: 404,
    };
  }

  if (array.ssid.length > 1) {
    const max = Math.max(...array.rssi);
    const index = array.rssi.indexOf(max);
    let location = array.ssid[index].split("-")[1];
    location = location.split("_");
    const room = location[0];
    const building = location[1];

    return {
      room: room,
      building: building,
    };
  } else {
    let location = array.ssid[0].split("-")[1];
    location = location.split("_");
    const room = location[0];
    const building = location[1];

    return {
      room: room,
      building: building,
    };
  }
}

const Patrimonio = require("../Models/Devices");

class Device {
  async teste(content) {
    let sala;
    let predio;

    let macAddress = content.macAddress;

    let actualData = new Date().toUTCString();

    try {
      const { room, building } = await getRoom(content);
      sala = room;
      predio = building;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

    let device = "";

    try {
      device = await Patrimonio.findOne({ macAddress: macAddress });
    } catch (err) {
      throw new Error(err);
    }

    if (device == null) {
      const newDevice = new Patrimonio({
        patrimonioId: "",
        macAddress: macAddress,
        name: "",
        sala: sala,
        predio: predio,
        historico: "[]",
        batery: 100,
        created_at: actualData,
        updated_at: actualData,
      });

      try {
        await newDevice.save();
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    } else {
      device.sala = sala;
      device.predio = predio;
      const edit = JSON.parse(device.historico);
      edit.push({ local: `${sala}_${predio}`, data: actualData });
      device.historico = JSON.stringify(edit);
      device.updated_at = actualData;

      try {
        await device.save();
      } catch (err) {
        throw new Error(err);
      }

      newSSIDs = { ssid: [], rssi: [] };
    }
  }

  async pegarTodos() {
    try {
      return await Patrimonio.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async createDevice(
    patID,
    deviceName,
    deviceSala,
    devicePredio,
    deviceBattery
  ) {
    const actualData = new Date().toUTCString();

    const alreadyExist = await Patrimonio.findOne({ patrimonioId: patID });

    if (alreadyExist.length > 0) {
      throw new Error("Dispositivo com esse patrimonio já cadastrado");
    }

    const device = new Patrimonio({
      patrimonioId: patID,
      name: deviceName,
      sala: deviceSala,
      predio: devicePredio,
      historico: "[]",
      batery: deviceBattery,
      created_at: actualData,
    });

    try {
      await device.save();
      return device;
    } catch {
      throw new Error("Erro ao criar o dispositivo");
    }
  }

  async getHistory(patID) {
    //Consertar a maneira que busca no mongo
    try {
      const result = await Patrimonio.findOne({ patrimonioId: patID });
      return result.historico;
    } catch {
      throw new Error("Erro ao buscar o dispositivo");
    }
  }

  async getPrediosSalasEquipamentos() {
    // code here
    try {
      const result = await Patrimonio.find();
      return result;
    } catch {
      throw new Error("Erro ao buscar as informações no banco de dados");
    }
  }

  async getAllBuildings() {
    let predios = [];
    const result = await Patrimonio.find().distinct("predio");

    async function getQnts() {
      for (let i = 0; i < result.length; i++) {
        let qnt = [];
        try {
          qnt = await Patrimonio.find({ predio: result[i] });
        } catch {
          throw new Error("Não foi possível verificar a quantidade");
        }

        const teste = {
          predio: result[i],
          qnt: qnt.length,
        };

        predios.push(teste);
      }
    }

    try {
      await getQnts();
    } catch (err) {
      throw new Error(err);
    }

    return predios;
  }

  async getAllSalasBuildings(Number) {
    try {
      const result = await Patrimonio.find({ predio: Number }).distinct("sala");
      return result;
    } catch {
      throw new Error("Erro ao buscar as informações no banco de dados");
    }
  }

  async getEquipamentoSala(predio, sala) {
    try {
      const result = await Patrimonio.find({ sala: sala, predio: predio });
      return result;
    } catch {
      throw new Error("Erro ao buscar as informações no banco de dados");
    }
  }

  async getInfosDevice(patId) {
    try {
      const device = await Patrimonio.findOne({ patrimonioId: patId });
      return device;
    } catch {
      throw new Error("Erro ao buscar as informações no banco de dados");
    }
  }

  async updateDevice(macAddress, name, patId) {
    let editing = {
      name: "",
      patrimonioId: "",
    };

    if (name != "") {
      editing.name = name;
    }

    if (patId != "") {
      editing.patrimonioId = String(patId);
    }

    if (patId == "" && name == "") {
      throw new Error("Nenhum dado para atualizar");
    }

    try {
      await Patrimonio.findOneAndUpdate({ macAddress: macAddress }, editing);
      return "Atualizado com sucesso";
    } catch {
      throw new Error("Erro ao atualizar o dispositivo");
    }
  }

  async deleteDevice(macAddress) {
    try {
      await Patrimonio.findOneAndDelete({ macAddress: macAddress });
      return "Deletado com sucesso";
    } catch {
      throw new Error("Erro ao deletar o dispositivo");
    }
  }
}

module.exports = {
  Device,
};
