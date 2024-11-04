//שליפת שם משתמש וניקוד 
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("user").innerHTML+=currentUser.userName+"!";
document.getElementById("score").innerHTML+=currentUser.score;