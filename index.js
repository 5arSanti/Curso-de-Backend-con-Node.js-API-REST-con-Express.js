const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ["http://localhost:3000", "http://127.0.0.1:5500"];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No permitido"));
        }
    }
}
app.use(cors(options));

app.get("/", (request, response) => {
    response.send("Hola mi server en express");
});


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Mi port es: " + port);
});
