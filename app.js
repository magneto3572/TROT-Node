require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const UserRouter = require("./api/users/user.routers")

app.use("/", UserRouter);

app.listen(process.env.APP_PORT,() => {
    console.log("Server up and running :" , process.env.APP_PORT);
});