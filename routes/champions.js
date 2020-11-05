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

//*create route for new Champion 
router.post("/", function(request, response){

    Champion.create(request.body.champ, function(error , createdChamp){
        if(error){
            console.log("Error occured during save of new Champ. \nError =  "+error);
        } else {
            response.redirect("/champions");
        }
    });
});

//*New Route
router.get("/new", function(request, response){
    response.render("champions/new")
});




//*Show Route
router.get("/:id", function (request,response){
    
    Champion.findById(request.params.id, function(error, foundChamp){
        
        if(error){
            console.log("Error occured while trying to access show route. Error = ", error);
        } else {
            response.render("champions/show", {champion: foundChamp});
        }
    });
});

module.exports = router;