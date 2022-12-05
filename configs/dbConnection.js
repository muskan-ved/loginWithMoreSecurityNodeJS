const mongoose = require('mongoose');
const dbName = 'loginMoreSecurity';
const URL =
  `mongodb+srv://dbUser:dbPassword@cluster0.onkep.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const dbConnection = async () =>{

    await mongoose.connect(`${URL}`,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    },err=>{
        if(!err){
            console.log("connection success to MongoDB")
        }
        else{
            console.log("error in connection to MongoDB" + err)
        }
    })
}

module.exports = dbConnection
