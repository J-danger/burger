var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

router.get("/", function(req,res){
	res.redirect("burgers")
});

router.get("/burgers", function(req,res){
	burgers.all(function(data){
		var newObject = {
			burgers: data,			
		};		
		res.render("index", newObject);
	});
});

router.post("/burgers/create", function(req,res){
	burgers.create(["burger_name", "devoured"],[req.body.burger_name, false], function(){                
				res.redirect("/burgers");
			});
});
router.put("/burgers/update/:id", function(req, res) {
	var condition = "id = " + req.params.id;
  
	console.log("condition", condition);
  
	burgers.update("devoured",
	  {
		devoured: req.body.devoured
	  },
	  condition,
	  function(result) {
		if (result.changedRows === 0) {
		  // If no rows were changed, then the ID must not exist, so 404
		  return res.status(404).end();
		}
		res.status(200).end();  
	  }
	);
  })

module.exports = router;