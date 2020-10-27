const champions = require("../models/champions");

const express   = require("express"),
      router    = express.Router(),
      Champion  = require("../models/champions"),
      passport  = require("passport");





//*index route
router.get("/", function(request, response){

    Champion.find({}, function(error, allChamps){

        if(error){
            console.log("Error occured while getting all Champs in index route. Error is"+error);
        } else {
            response.render("champions/index", {champions: allChamps});
        }
    });
    
});

module.exports = router;