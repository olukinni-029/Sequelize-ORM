const express = require('express');
const bodyParser =require('body-parser');
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8082"
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()

app.get('/',(req,res)=>{
    res.json({message:"Digital Note"});
    console.log('Digital Note');
})

require("./app/routes/note.routes")(app);

const port =process.env.PORT || 2524;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});