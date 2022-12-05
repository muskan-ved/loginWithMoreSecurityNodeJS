var express = require('express');
const cors = require("cors");


const app = express();
const auth = require('./apis/auth');
const receptioninst = require('./apis/receptioninst')
const visitor = require('./apis/visitor')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `*`);
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-JWT-Token");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, PATCH, OPTIONS");
    next();
});

app.use(cors())


app.use("/api",auth);
app.use("/api",receptioninst);
app.use("/api",visitor);

module.exports = app;
