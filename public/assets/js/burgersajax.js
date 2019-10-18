
$(function() {

    $(".create-update-form").on("submit", function(event) {
    
        event.preventDefault();

        var newBurger = {
        burger_name: $("#newBurger").val().trim(),
        devoured: 0
        };
    
        $.ajax("/burgers/create", {
        type: "POST",
        data: newBurger
        }).then(
        function() {                   
            location.reload();
        }
        );
    });

    $(".change-devour").on("click", function(event) {
      event.preventDefault();
        var id = $(this).data("id");           
        var newState = {
          devoured: 1
        }; 
        $.ajax("/burgers/update/" + id, {
          type: "PUT",
          data: newState
        }).then(
          function() { 
            location.reload();
          }
        );
      });   





    
    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");
        event.preventDefault();
        // Send the DELETE request using ajax.
        $.ajax("/burgers/" + id, {
          type: "DELETE",
        }).then(
          function() {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
  
});