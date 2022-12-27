const { validationResult } = require("express-validator");
const device = require("../services/device");
require("express-async-errors");

const Device = new device.Device();

const teste = async (req, res) => {
  //Pega as infos da requisição
  const content = req.body;

  try {
    //Tratamento das respostas do método da classe
    const result = await Device.teste(content);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getPredios = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     error: errors.errors[0].msg,
  //   });
  // }
  try {
    const result = await Device.getAllBuildings();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getEquipamentosRegistrados = async (req, res) => {
  try {
    const result = await Device.pegarTodos();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createDevice = async (req, res) => {
  const { patId, deviceName, deviceSala, devicePredio, deviceBattery } = req.body;

  //Valida se algum paremetro é inválido
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    //Tratamento das respostas do método da classe
    const result = await Device.createDevice(patId, deviceName, deviceSala, devicePredio, deviceBattery);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getHistory = async (req, res) => {
  const { patId } = req.body;

  //Valida se algum paremetro é inválido
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    //Tratamento das respostas do método da classe
    const result = await Device.getHistory(patId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getPrediosSalasEquipamentos = async (req, res) => {
  try {
    const result = await Device.getPrediosSalasEquipamentos();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getSalas = async (req, res) => {
  const { number } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    const result = await Device.getAllSalasBuildings(number);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getEquipamentoSala = async (req, res) => {
  const { predio, sala } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    const result = await Device.getEquipamentoSala(predio, sala);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getInfosDevice = async (req, res) => {
  const { patId } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    const result = await Device.getInfosDevice(patId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateDevice = async (req, res) => {
  const { macAddress, deviceName , patId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    const result = await Device.updateDevice(macAddress, deviceName, patId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const deleteDevice = async (req, res) => {
  const { macAddress } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    const result = await Device.deleteDevice(macAddress);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//Exporta as funções do controller para o ROUTER
module.exports = {
  teste,
  createDevice,
  getHistory,
  getPrediosSalasEquipamentos,
  getEquipamentosRegistrados,
  getPredios,
  getSalas,
  getEquipamentoSala,
  getInfosDevice,
  updateDevice,
  deleteDevice
};
