var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

router.get("/", function(req,res){
	res.redirect("burgers")
});

router.get("/burgers", function(req,res){
	burgers.all(function(data){
		var newObject = {
			burgers: data
		};
		
		res.render("index", newObject);
	});
});

router.post("/burgers/create", function(req,res){
	burgers.create(["burger_name"],[req.body.burger_name], function(){                
				res.redirect("/burgers");
			});
});

router.put("/burgers/update/:id", function(req,res){
	var condition = "id = " + req.params.id;
	console.log(condition);

	burgers.update({
		devoured: req.body.devoured
	}, condition, function(){
		res.redirect("/burgers")
	});
});

module.exports = router;