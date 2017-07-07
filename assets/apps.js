

// Initialize Firebase
var config = {
  apiKey:  ,
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

database.ref().on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot

  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);

// append new row to the train table
  $(".train-table > tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" +
  snapshot.val().trainTime + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextTrain + "</td> <td>" + snapshot.val().minutesAway + "</td></tr>");


  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";



// Capture Button Click
$("#add-train").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();

  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#trainTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  console.log("traintime:" + trainTime);


  var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,
    nextTrain: moment(nextTrain).format("hh:mm"),
    minutesAway: tMinutesTillTrain
  });


// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot

  console.log(snapshot.val());
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);

// append new row to the train table
  // $(".train-table > tbody").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" +
  // snapshot.val().trainTime + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextTrain + "</td> <td>" + snapshot.val().minutesAway + "</td></tr>");


  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#trainName-input").val("");
$("#destination-input").val("");
$("#trainTime-input").val("");
$("#frequency-input").val("");
 });
