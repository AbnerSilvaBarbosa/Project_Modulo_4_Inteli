const express = require("express");
require("express-async-errors");
require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());

app.use(express.json()); //Irá suportar JSON
app.use(
  bodyParser.urlencoded({
    // Irá suportar urlenconded
    extended: true,
  })
);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "IPT - IOT Project API",
        version: "0.1.0",
        description:
            "Backend utilizada para conexão do FrontEnd com as informações recebedias dos dispositivos IOT, espelhados pelo campus do IPT",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        },
        servers: [
        {
            url: "http://localhost:3001",
        },
        ],
    },
    apis: ["./Routes/buzzer.js", "./Routes/user.js"],
};

const specs = swaggerJsdoc(options);
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(specs)
);

mongoose.connect(`mongodb+srv://IPTracker:${process.env.MONGO_PASS}@cluster0.zyrrcuq.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PORT = process.env.PORT || 3001;

const buzzerRouter = require('./Routes/buzzer')
const deviceRouter = require('./Routes/device')
const userRouter = require('./Routes/user')

app.use("/Buzzer", buzzerRouter)
app.use("/Device", deviceRouter)
app.use("/User", userRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
