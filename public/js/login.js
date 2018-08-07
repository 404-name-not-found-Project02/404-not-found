// Initialize Firebase
var config = {
    apiKey: "AIzaSyAStUYCK4F4Tc14FfGOWDRVlgxHdvwxwpo",
    authDomain: "name-not-found.firebaseapp.com",
    databaseURL: "https://name-not-found.firebaseio.com",
    projectId: "name-not-found",
    storageBucket: "name-not-found.appspot.com",
    messagingSenderId: "296392176918"
};
firebase.initializeApp(config);

var database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;
        if (user != null) {
            var email_id = user.email;
        }
    } else {
        // No user is signed in.
    }
});

$("#login").on("click", function (event) {
    event.preventDefault();

    var userName = $("#email").val().trim();
    var password = $("#password").val().trim();
    window.alert(userName);

    firebase.auth().createUserWithEmailAndPassword(userName, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });

});

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}