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


  $('#submitbutton').on('click', function(){
    alert('you clicked me !');
  })