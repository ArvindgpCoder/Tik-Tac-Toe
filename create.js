var toggle = 1;
var istarted = 0;
const arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

let checkrow = () => {
    for (let i = 0; i < arr.length; i++) {
        var sum = arr[i][0] + arr[i][1] + arr[i][2];
        if (sum === 3 || sum === -3) {
            return 1;
        }
    }
    return 0;
};

let checkcol = () => {
    for (let i = 0; i < arr.length; i++) {
        var sum = arr[0][i] + arr[1][i] + arr[2][i];
        if (sum === 3 || sum === -3) {
            return 1;
        }
    }
    return 0;
};

let checkdiag = () => {
    var sum1 = 0;
    var sum2 = 0;
    for (let i = 0; i < arr.length; i++) {
        sum1 += arr[i][i];
        sum2 += arr[i][2 - i];
    }
    if (sum1 === 3 || sum1 === -3 || sum2 === 3 || sum2 === -3) {
        return 1;
    }
    return 0;
};
let alll = () => {


    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] == 0) {
                return 0;
            }
        }
    }

    return 1;
};
let fun = (className) => {
    var lastCharacter = parseInt(className.charAt(className.length - 1), 10);
    lastCharacter--;
    var row = Math.floor(lastCharacter / 3);
    var col = lastCharacter % 3;
   console.log(istarted);
    if (istarted!=1) {
        staging();
    }

    var target = document.getElementsByClassName(className)[0];
    var newElement1 = createH1("O");
    var newElement2 = createH1("X");

    if (toggle) {
        var oldelement = target.children[0];
        if (!elementOccupied(oldelement, newElement1, newElement2)) {

            arr[row][col] = 1;
            green(newElement1);


            replace(newElement1, oldelement, target);



            toggle = 1 - toggle;
        }
    } else {
        var oldelement = target.children[0];
        if (!elementOccupied(oldelement, newElement1, newElement2)) {

            arr[row][col] = -1;
            red(newElement2);

            replace(newElement2, oldelement, target);



            toggle = 1 - toggle;
        }
    }




};

function replace(newElement, oldelement, target) {

    target.replaceChild(newElement, oldelement);
    print();

};


var createH1 = (text) => {
    var newElement = document.createElement("h1");
    var textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
    return newElement;
};

var elementOccupied = (element, newElement1, newElement2) => {
    return (
        element.textContent === newElement1.textContent ||
        element.textContent === newElement2.textContent
    );
};

var red = (newElement) => newElement.style.color = "red";
var green = (newElement) => newElement.style.color = "green";

var staging = () => {
    if (!istarted) {
        istarted = 1;
        start(); 
    } else {
        restart();
    }
};
var player1 = "player1";
var player2 = "player2";
var start = () => {
    player1 = prompt("Enter Player 1");
    player2 = prompt("Enter Player 2");
    var target1 = document.getElementById("player1");
    var target2 = document.getElementById("player2");
    target1.innerText = player1;
    target2.innerText = player2;
};

var print = () => {
    var resultContainer = document.getElementsByClassName("body")[0];
    if (alll()) {
        resultContainer.innerHTML = "Match, Draw!";
        var resetButton = createResetButton();
        resultContainer.classList.add("design");
        replaceContent(resultContainer, resetButton);
    } else if (checkrow() || checkcol() || checkdiag()) {
        resultContainer.innerHTML = `Congratulations ${toggle == 1 ? player1 : player2}! You won`;
        var resetButton = createResetButton();
        resultContainer.classList.add("design");

        replaceContent(resultContainer, resetButton);

    }
};

var createResetButton = () => {
    var resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.id = "resetButton";
    resetButton.classList.add("reset");
    resetButton.onclick = restart;
    return resetButton;
};

var replaceContent = (container, newContent) => {
   
    container.appendChild(newContent);
};


var restart = () => location.reload(false);