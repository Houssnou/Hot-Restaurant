//listener of on click event on add reservation
$("#add-reservation").on("click", function (event) {
  //avoid reaload page
  event.preventDefault();
  //account-input
  const newReservation = {
    name: $("#name-input").val().trim(),
    email: $("#email-input").val().trim(),
    phone: $("#phone-input").val().trim(),
    isWaiting: 1 //by default ew reservation isWaiting = 1
  };

  console.log(newReservation);
  // request post with the data
  $.ajax({
      url: "/api/tables",
      method: "POST",
      data: newReservation
    })
    .then(function (data) {
      alert("Reservation saved!");
      //clear the input fields
      $("#name-input").val("");
      $("#email-input").val("");
      $("#phone-input").val("");
      $("#account-input").val("");
    });
});

//listener of on click event on add 
// call the API tables
$.ajax({
    url: "/api/tables",
    method: "GET"
  })
  .then(function (reservations) {
    console.log(reservations);
    for (var i = 0; i < reservations.length; i++) {

      //build the content of reservations 
      const $card = $("<card>");
      // card header
      var $cardHeader = $("<h4 class='card-header bg-dark text-light'>")
        .text(`table #${i}`)
        .appendTo($card);

      // article body
      var $cardBody = $("<div class='card-body'>");
      $cardBody
        .append(`<p> Name: ${reservations[i].name}</p>`)
        .append(`<p> Email: ${reservations[i].email}</p>`)
        .append(`<p> Phone: ${reservations[i].phone}</p>`)
        .appendTo($card);

      //append whole card to the reservations
      $("#reservations").append($card);
    }
  });

// call the API Waitlist
$.ajax({
    url: "/api/waitlist",
    method: "GET"
  })
  .then(function (waitlist) {
    console.log(waitlist);
    for (var i = 0; i < waitlist.length; i++) {
      //build the content of the waitlist 
      const $card = $("<card>");
      // card header
      var $cardHeader = $("<h4 class='card-header bg-dark text-light'>");
          $cardHeader.text(`table #${i}`)
                     .appendTo($card);

      // article body
      var $cardBody = $("<div class='card-body'>");
          $cardBody
                  .append(`<p> Name: ${waitlist[i].name}</p>`)
                  .append(`<p> Email: ${waitlist[i].email}</p>`)
                  .append(`<p> Phone: ${waitlist[i].phone}</p>`)
                  .appendTo($card);

      //append whole card to the reservations
      $("#waitlist").append($card);
    }
  });