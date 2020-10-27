const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      seedDB      = require("./seeds"),
      Champion    = require("./models/champions");


//*route dependencies
const indexRoutes    = require("./routes/index"),
      championRoutes = require("./routes/champions");




//*app setup
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));

//* Database connection

const url = process.env.DATABASEURL || "mongodb://localhost:27017/NorthAmericanGreenBook";

mongoose.connect(url, {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB for North American Green Book!!!'))
.catch(error => console.log(error));

seedDB();



//*Route calls
app.use("/", indexRoutes);
app.use("/champions", championRoutes);





const port = process.env.PORT || 3000;


app.listen(port, function(){
    console.log(`NAGB site running on port ${port}!!` );
});

