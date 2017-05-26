$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbMAVrVBP6F8IM0mID-2g7Za0ljDkg61A",
    authDomain: "train-scheduler-ce3a0.firebaseapp.com",
    databaseURL: "https://train-scheduler-ce3a0.firebaseio.com",
    projectId: "train-scheduler-ce3a0",
    storageBucket: "train-scheduler-ce3a0.appspot.com",
    messagingSenderId: "635495989375"
  };

  firebase.initializeApp(config);

  //firebase set to variable database
  var database = firebase.database();

  //set inputs to empty strings
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";


  // click event for submit
   $("#submitbutton").on("click", function(event) {

     event.preventDefault();

      //trim values of input fields
      trainName = $("#trainname").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#firsttraintime").val().trim();
      frequency = $("#frequency").val().trim();
     

      // push above values to firebase
      database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
      });
    });



    database.ref().on("child_added", function(watcher){

      console.log('Train Name: ' + watcher.val().trainName);
      console.log('Destination: ' + watcher.val().destination);
      console.log('First Train Arrival Time: ' + watcher.val().firstTrainTime);
      console.log('Train Frequency: ' + watcher.val().frequency);

      //clear input fields
      $('.form-control').val("");

      //math
      //current time
      var currentTime = moment();
      console.log("Current Time: " + moment(currentTime).format('HH:mm'));

      //first train time input, -1 year to insure input is not registered as "future"
      var firstTime = moment(watcher.val().firstTrainTime, 'HH:mm', true).subtract(1, "years");

      //frequency of train arrivals
      var tFrequency = moment(parseInt(watcher.val().frequency));

      //difference in time (in minutes) between now (moment()) and first train time
      var diffTime = moment().diff(moment(firstTime), "minutes");

      //divides the difference in time by the frequency of train arrivals and returns the difference
      var remainder = diffTime % tFrequency;

      //subtracts the remainder by the frequency of train arrivals
      var timeTillTrain = parseInt(tFrequency - remainder);

      //add time until next train (in minutes) to show arrival time in hours and minutes
      var nextChooChoo = moment().add(timeTillTrain, "minutes");

      //make sure time until next train is formatted correctly
      var formatNextChooChoo = moment(nextChooChoo).format("HH:mm");


    
       //append new info to table body
      $('.tablebody').append("<tr><td id = 'train_name'>" + watcher.val().trainName 
        + "</td><td id = 'arrival_destination'> " + watcher.val().destination
        + "</td><td id = 'frequency_minutes'> " + watcher.val().frequency
        + "</td><td id = 'next_arrival'> " + formatNextChooChoo
        + "</td><td id = 'minutes_togo'> " + timeTillTrain        
        + "</td></tr>")

     
      
      
      
     

      var factChecker = function(){
        var startTime = moment().format('ss');
        var counter = parseInt($('#minutes_togo').text());        
        console.log(startTime);

        if(startTime === '00'){
          counter--;
          console.log(counter);
          $('#minutes_togo').text(counter);
        }
        if (counter === 0){
          $('#minutes_togo').text(timeTillTrain);
        }
      }
      

        
       var check = setInterval(function(){
        factChecker()}, 1000);
       



      //play audio
      var whistle = $('#whistle')[0];
       $('#whistle').get(0).play();


      // error handler
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);


    //closing tags errorObject
    });
});
