const form = document.getElementsByTagName("form")[0];
let showCheckbox = document.getElementById("showCheckbox");
showCheckbox.addEventListener("click", showPassword);

//פונקציית הרשמות
function signUp() {
    //בניית משתמש נוכחי
    let currentUser = { userName: form["userName"].value, email: form["mail"].value, password: form["code"].value, score: 0 }
    let usersArray = JSON.parse(localStorage.getItem("users"))
    //במקרה שהמערך קיים והמשתמש כבר רשום במערכת, מעבר לעמוד התחברות
    if (usersArray && ifUserExist(usersArray, currentUser)) {
        alert("You are registered, you will immediately be transferred to the login page");
        let url = window.location.href;
        window.location.href = url.replace(/\/[^\/]*$/, "/login.html");
        return false;
    }
    else {
        if (!usersArray) {  //במקרה שעוד אין משתמשים רשומים, יצירת המערך
            usersArray = [];
        }
        //דחיפת המשתמש החדש למערך 
        usersArray.push(currentUser);
        localStorage.setItem("users", JSON.stringify(usersArray));//דחיפת מערך המשתמשים ללוקל סטורג' 
        localStorage.setItem("currentUser", JSON.stringify(currentUser));//דחיפת משתמש נוכחי ללוקל סטורג'
        return true;
    }
}

//פונקציה שבודקת האם המשתמש קיים במערך המשתמשים
function ifUserExist(usersArray, currentUser) {
    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userName == currentUser.userName && usersArray[i].password == currentUser.password) {
            return true;
        }
    }
    return false;
}

//פונקציה שמציגה או מסתירה את תווי הסיסמא 
function showPassword() {
    if (showCheckbox.checked == true) {
        document.getElementById("code").type = "text";
        document.getElementById("ConfirmPassword").type = "text";
    }
    else {
        document.getElementById("code").type = "password";
        document.getElementById("ConfirmPassword").type = "password";
    }
}

//בדיקת אימות הסיסמא
function CheckConfirmPassword() {
    if ((document.getElementById("code").value) != (document.getElementById("ConfirmPassword").value)) {
        alert("The password is not the same")
        document.getElementById("ConfirmPassword").value = ""
    }
}
