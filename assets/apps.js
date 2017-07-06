

// Initialize Firebase
var config = {
  apiKey: ,
  authDomain: "train-tracker-916c4.firebaseapp.com",
  databaseURL: "https://train-tracker-916c4.firebaseio.com",
  projectId: "train-tracker-916c4",
  storageBucket: "",
  messagingSenderId: "155012228153"
};
firebase.initializeApp(config);

// variable to reference the database
var database = firebase.database();

// Initial variable values to be captured

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";


// Capture Button Click
$("#add-train").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#trainTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  database.ref().set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });



});


// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);


  $(".train-table > tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" +
  snapshot.val().trainTime + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().frequency + "</td></tr>");
});
    // var counter = 1;
    // var newRow = $("<tr> <td> 'trainName' </td> </tr>");

    // $('table.train-table').append(newRow);
    // $('#train-table > tbody:last').append(newRow);



  // Change the HTML to reflect
  // $("#name-display").html(snapshot.val().trainName);
  // $("#email-display").html(snapshot.val().destination);
  // $("#age-display").html(snapshot.val().trainTime);
  // $("#comment-display").html(snapshot.val().frequency);

  // Handle the errors
// },
// function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });
