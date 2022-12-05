require("dotenv").config();

const bodyParser = require("body-parser");

const app = require('./routes/index')
const port = process.env.PORT || 3000;

// db connect
const DatabaseConn = require('./configs/dbConnection');
DatabaseConn();


app.listen(port,()=>{
    console.log(`server started on ${port}`);
})

// Handling Error
