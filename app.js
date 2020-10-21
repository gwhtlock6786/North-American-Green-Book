const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser");


const indexRoutes   = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRoutes);

const port = process.env.PORT || 3000;


app.listen(port, function(){
    console.log(`NAGB site running on port ${port}!!` );
});

