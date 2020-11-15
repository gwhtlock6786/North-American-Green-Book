const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      seedDB         = require("./seeds"),
      Champion       = require("./models/champions"),
      User           = require("./models/user"),
      methodOverride = require("method-override"),
      LocalStrategy  = require("passport-local"),
      passport       = require("passport");


//*route dependencies
const indexRoutes    = require("./routes/index"),
      championRoutes = require("./routes/champions");




//*app setup
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//* Database connection

const url = process.env.DATABASEURL || "mongodb://localhost:27017/NorthAmericanGreenBook";


mongoose.connect(url, {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB for North American Green Book!!!'))
.catch(error => console.log(error));

// seedDB();

//* PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the Way!!",
    resave: false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//*middleware that allows all routes to see the request.user variable
app.use(function(request, response, next){
    response.locals.currentUser = request.user;
    next();
});




//*Route calls
app.use("/", indexRoutes);
app.use("/champions", championRoutes);





const port = process.env.PORT || 3000;


app.listen(port, function(){
    console.log(`NAGB site running on port ${port}!!` );
});

