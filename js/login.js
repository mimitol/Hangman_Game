const form = document.getElementsByTagName("form")[0];
let showCheckbox = document.getElementById("showCheckbox")
showCheckbox.addEventListener("click", showPassword)
//פונקציית התחברות
function login() {
    //בניית משתמש נוכחי
    let currentUser = { userName: form["userName"].value, password: form["code"].value }
    let usersArray = JSON.parse(localStorage.getItem("users"));
    //במקרה שקיים מערך משתמשים והמשתמש רשום כניסה לדף הבית
    if (usersArray && ifUserExist(usersArray, currentUser)) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        return true;
    }
    //במקרה שאין מערך משתמשים עדיין או שהמשתמש לא רשום מעבר לעמוד הרשמות
    else {
        alert("You are not registered, you will immediately be transferred to the registration page");
        let url = window.location.href;
        //ביטוי רגולרי
        window.location.href = url.replace(/\/[^\/]*$/, "/signUp.html");
        return false;

    }
}
//פונקציה שבודקת האם המשתמש קיים במערך המשתמשים
function ifUserExist(usersArray, currentUser) {
    for (let i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userName == currentUser.userName && usersArray[i].password == currentUser.password) {
            currentUser.score = usersArray[i].score;  //עדכון הנקודות למשתמש נוכחי
            return true;
        }
    }
    return false;
}
//פונקציה שמציגה או מסתירה את תווי הסיסמא 
function showPassword() {
    if (showCheckbox.checked == true) {
        document.getElementById("code").type = "text";
    }
    else {
        document.getElementById("code").type = "password";
    }
}