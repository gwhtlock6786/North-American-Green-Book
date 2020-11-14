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
    let name = request.body.name;
    let profession = request.body.profession;
    let profT = request.body.professionalTitle;
    let image = request.body.image;
    let dets = request.body.details;
    let email = request.body.email;
    let pNum = request.body.phone;
    let author = {
        id: request.user._id,
        username: request.user.username
    }

    let newChamp = {name: name, profession: profession, professionalTitle: profT, image: image, details: dets, email: email, phone: pNum, author: author}

    Champion.create(newChamp, function(error , createdChamp){
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


//*Edit route
router.get("/:id/edit", function(request, response){

    Champion.findById(request.params.id, function(error, foundChamp){

        if(error){
            console.log("Error = "+error);
        } else {
            response.render("champions/edit", {champion: foundChamp});
        }
    });
});


//*Update Route
router.put("/:id", function(request, response){

    Champion.findByIdAndUpdate(request.params.id, request.body.champ, function(error, updatedChamp){
        if(error){
            console.log("Error = "+error);
        } else {
            response.redirect("/champions/"+ updatedChamp._id);
        }
        
    });
});


  //*Destory route
  router.delete("/:id", function(request, response){

    Champion.findByIdAndRemove(request.params.id, function(error){
        if(error){
            console.log("Error = ",error);
        } else {

            response.redirect("/champions");
        }
    });
    
});





module.exports = router;