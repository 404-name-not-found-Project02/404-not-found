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

$("#login-btn").on("click", function (event) {
    event.preventDefault();
    toggleSignIn();
    console.log("clicked the button");
});

$("#signup-btn").on("click", function (event) {
    event.preventDefault();
    handleSignUp();
    console.log("clicked the button");
});


function signUp() {
    firebase.auth().createUserWithEmailAndPassword(userName, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
    });
}


function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        console.log("signed Out");
        window.location = 'index.html';
        firebase.auth().signOut();
        // [END signout]
    } else {
        //sign-in
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {


            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                //put route here
            } else {
                $("#loginMessage").text("Successful Login...Going To Your Dashboard!");
                setTimeout(function () {
                    window.location = 'dashboard.html';
                }, 2000);
                console.log("Logged in mate...")
                alert(errorMessage);
            }
            console.log(error);

            // [END_EXCLUDE]
        });
        // [END authwithemail]

    }
}

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User is signed in.")
            // var displayName = user.displayName;
            // var email = user.email;
            var emailVerified = true;
            $("#loginMessage").text("Already Logged In! Redirecting to your Dashboard!");
            //user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
            // var providerData = user.providerData;
            window.location = 'dashboard.html';
            // [START_EXCLUDE]

            if (!emailVerified) {
                console.log(false)
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]

        // [END_EXCLUDE]
    });
    // [END authstatelistener]

    // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    // document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

function handleSignUp() {
    var email = $("#signup-email").val().trim();
    var password = $("#signup-password").val().trim();
    var firstName = $("#first-name").val().trim();
    var lastName = $("#last-name").val().trim();
    var brandName = $("#brand-name").val().trim();
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            //put post ajax call here
            alert(errorMessage);
        }
        console.log(error);

        console.log(provider);
        console.log(firebase.auth().currentUser)

        // [END_EXCLUDE]
    }).then(function () {
        var provider = {};
        provider.email = email;
        provider.last_name = lastName;
        provider.first_name = firstName;
        provider.brand_name = brandName;
        provider.firebase_id = firebase.auth().currentUser.uid;
        console.log(provider);
        // create object
        // call function
        createUser(provider);
        // app.post("/api/providers", function (req, res) {
        //     console.log(req.body);
        //     db.Providers.create({
        //         last_name: req.body,
        //         first_name: req.body.body,
        //         category: req.body.category
        //     })
        //         .then(function (dbPost) {
        //             res.json(dbPost);
        //         });
        // });
    })
    // [END createwithemail]
    // $("#loginMessage").text("Successful Signup...Going To Your Dashboard!");
    // setTimeout(function () {
    //     window.location = 'dashboard.html';
    // }, 2000);
    // console.log("Logged in mate...")
}

$(document).ready(function () {
    console.log(firebase.auth())
});

function createUser(Post) {

    $.post("/api/providers", Post, function () {

    });
}