let time = document.getElementById("time");//משתנים לצורך הטיימר
let timer = 0;
let interval;
let min, max, index, i;//משתנים כלליים
let currentWord;//המילה המוגרלת
let currentImage = 1;//מונה לתמונות
let word = [];//מערך לצורך פירוק המילה
let letterButton;//משתנה לצורך שליפת האות שנבחרה
let divOfLetters = document.getElementById("letters").getElementsByTagName('button');//שליפת כל כפתורי האותיות
let divOfGame = document.getElementById("game");//שליפת הדיב שמכיל את לוח המשחק
let divOfCategories = document.getElementById("category").getElementsByTagName('button');//שליפת כפתורי הקטגוריות
let cuurentCategory;//משתנה לצורך הקטגוריה שנבחרה

//הסתרת לוח המשחק והפיכת הכפתורים לדיסאייבלד
divOfGame.style.visibility = "hidden";
document.getElementById("theWord").style.visibility = "hidden";
disableDiv(divOfLetters, true);

//פונקציה שמגרילה מילה בהתאם לנושא שנבחר ומדפיסה מספר קווים מתאים על המסך
function randAndPrint(min, max) {
    cuurentCategory = min / 10;//שינוי העיצוב של הקטגוריה שנבחרה
    divOfCategories[cuurentCategory].style.backgroundColor = "crimson";
    divOfCategories[cuurentCategory].style.color = "white";
    //הפיכת לוח המשחק לגלוי וכפתורי הקטגוריות לדיסאייבלד
    divOfGame.style.visibility = "visible";
    document.getElementById("theWord").style.visibility = "visible";
    disableDiv(divOfCategories, true)
    disableDiv(divOfLetters, false)
    //הגרלת מילה, השמה במערך הבדיקה והדפסת מספר קווים בהתאם על המסך
    index = Math.floor(Math.random() * (max - min + 1)) + min;
    currentWord = words[index];
    for (i = 0; i < currentWord.length; i++) {
        word[i] = '_';
    }
    document.getElementById("theWord").innerHTML = word.join(" ");
    //טיימר
    interval = setInterval(() => {
        time.innerHTML = "Time:" + ++timer + " seconds";
        if (timer == 60) {
            currentImage = 11;
            alert("Time's up!")
            endGameLose();
        }
    }, 1000);
}
//פונקציה שמקבלת דיב והופכת אותו לאייבל/דיסאייבל בהתאם למבוקש
function disableDiv(divName, flag) {
    for (i = 0; i < divName.length; i++) {
        divName[i].disabled = flag;
    }
}
//הפונקציה מקבלת את האות שנבחרה 
function letters(l) {
    //הפיכת האות שנבחרה לדיסאייבלד
    letterButton = document.getElementById("letter" + l.toUpperCase())
    letterButton.disabled = true;
    //במקרה שהאות לא קיימת במילה כלל, כלןמר האות לא נכונה
    if (currentWord.includes(l) == false) {
        letterButton.style.backgroundColor = "red";//שינוי צבע
        document.getElementById("hangmanPicture").src = "../media/" + currentImage.toString() + ".png";//קידום התמונה 
        document.getElementById("massages").innerHTML = "you can have more: " + (10 - currentImage) + " mistakes"//קידום מונה הטעויות
        currentImage++;//קידום מונה התמונה
        if (currentImage == 11) {//במקרה שהגענו לתמונה האחרונה מעבר לסיום משחק-הפסד
            endGameLose();
        }
    }
    //במקרה שהאות קיימת לפחות פעם אחת
    else {
        letterButton.style.backgroundColor = "#346C8C";//שינוי צבע
        for (i = 0; i < currentWord.length; i++) {//בדיקה איפה האות מופיעה והשמתה
            if (currentWord[i] == l) {
                word[i] = l;
            }

        }
        document.getElementById("theWord").innerHTML = word.join(" ");//הצגה על המסך את המילה עם האות החדשה
        if (word.includes("_") == false) {//בדיקה אם המילה כולה הושלמה, אם כן מעבר לסיום משחק-נצחון
            endGameWin();
        }
    }
}
//פונקציית הפסד
function endGameLose() {
    document.getElementById("winOrLose").innerHTML += " lose, the word was " + currentWord;
    endGame();
}
//פונקציית נצחון
function endGameWin() {
    document.getElementById("winOrLose").innerHTML += " win!!";
    endGame();
}
//סיום משחק
function endGame() {
    clearInterval(interval);//עצירת טיימר
    document.getElementById("score").innerHTML += (11 - currentImage) * 10 + " points";//הצגת נקודות למשחק זה
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));//שליפת השחקן הנוכחי
    currentUser.score += (11 - currentImage) * 10;//עדכון נקודות
    document.getElementById("totalScore").innerHTML += currentUser.score;//הצגת סך הנקודות שנצברו עד כה
    document.getElementById("totalTime").innerHTML += timer + " seconds";// הצגת הזמן
    localStorage.setItem("currentUser", JSON.stringify(currentUser));//עדכון השחקן הנוכחי מחדש (כולל הנקודות שנוספו)
    updateScore(currentUser);
    disableDiv(divOfLetters, true);//הפיכת כל הפקדים לדיסאייבלד
    let gameOverMessage = document.getElementById("gameOver").style.display = "block";//הצגת הדיב של סיום משחק על המסך
}
//פונקציית עדכון נקודות לשחקן בתוך מערך המשתמשים
function updateScore(currentUser) {
    usersArray = JSON.parse(localStorage.getItem("users"));
    for (i = 0; i < usersArray.length; i++) {
        if (usersArray[i].userName == currentUser.userName && usersArray[i].password == currentUser.password) {
            usersArray[i].score += (11 - currentImage) * 10;
            localStorage.setItem("users", JSON.stringify(usersArray));
            i=usersArray.length;
        }
    }
}