const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const routes = require("./Routes/Routes.js");


const app = express();
// const corsList = {
//     origin: "http://localhost:8080" //url được phép call API
// };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use(dotenv);
app.use("/",routes);

app.listen(process.env.PORT,() =>{
    console.log("Server Is Running");
  //  console.log(process.env.PORT);
})
//trước khi run sv
//set GOOGLE_APPLICATION_CREDENTIALS=mysql-283808-5b6793a8d1b7.json  //Chạy lệnh này để cấu hình key.js cho google tts API