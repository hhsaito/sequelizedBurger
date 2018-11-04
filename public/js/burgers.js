$(document).ready(function() { 

  var waitContainer = $("#waiting ul"),
     eatenContainer = $("#eaten ul");

  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      console.log("Burgers", data);
      initializeWaiting();
    });
  }
  // This function grabs burgers from the database and updates the view
  function getDevoured() {
    $.get("/api/devoured", function(data) {
      burgers = data;
      console.log("Devoured", data);
      initializeDevoured();
    });
  }

  function initializeWaiting() {
    waitContainer.empty();
    var burgersToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      burgersToAdd.push(createNewRow(burgers[i]));
    }
    waitContainer.append(burgersToAdd);
  }
  function initializeDevoured() {
    eatenContainer.empty();
    var burgersToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      burgersToAdd.push(createNewRow(burgers[i]));
    }
    eatenContainer.append(burgersToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(burger) {

    var newBurgerBody = $("<li>");
    var devoureBtn = $("<button>");
    devoureBtn.attr({"type": "submit", "class": "devoure-it"});
    devoureBtn.text("Devoure it!");
    newBurgerBody.text(burger.id + ". " + burger.burger_name);
    newBurgerBody.append(devoureBtn);
    newBurgerBody.data("burger", burger);

    return newBurgerBody;
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#bn");

  $("#createBurger").on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body
    if (!bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newBurger = {
      burger_name: bodyInput.val().trim(),
    };

    submitBurger(newBurger);
    bodyInput.val('');

  });
  $("#waiting").on("click", ".devoure-it", function(event) {
    event.preventDefault();  
    // Constructing a newPost object to hand to the database
    var currentBurger = $(this)
    .parent()
    .data("burger");

    var newBurger = {
      devoured: true,
      id: currentBurger.id
    };
    updateBurger(newBurger);

  });

  // Submits a new burger
  function submitBurger(Burger) {
    $.post("/api/burgers/", Burger, function() {
      getBurgers();
      getDevoured();
    });
  }
  // Update a given post, bring user to the blog page when done
  function updateBurger(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers/",
      data: burger
    })
    .done(function() {
      getBurgers();
      getDevoured();
    });
  }

  getBurgers();
  getDevoured();

});