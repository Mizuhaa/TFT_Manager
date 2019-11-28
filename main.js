window.onload = function () {
    this.generateAndCreate5Cards();
    displayGolds();
    displayExp();
};

var golds = 5;
var exp = 100;
var charactersArray = ['Alternant', 'Employee', 'Senior'];
var skillsArray = ['PHP', 'C#', 'JS', 'COBOL'];
var playerArray = [];
var currenTurn = 1;

function displayGolds() {
    document.getElementById("goldDisplayer").innerHTML = " " + golds;
}

function displayExp() {
    document.getElementById("expDisplayer").innerHTML = " " + Math.floor(exp / 100);
}

function displayTurn() {
    document.getElementById("turnCounter").innerText = currenTurn;
}

function addTheField(numberPng) {
    var spanContainer = document.createElement('span');
    spanContainer.classList.add("imageContainer");

    var img = document.createElement('img');
    img.src = "res/fields/" + numberPng + ".png";
    img.classList.add("cardHolder");
    img.id = numberPng;

    img.setAttribute('onclick', 'selectField(this)');

    spanContainer.appendChild(img);

    document.getElementById("holodeck").appendChild(spanContainer);
}

function addTheImage(numberPng) {
    var spanContainer = document.createElement('span');
    spanContainer.classList.add("imageContainer");

    var img = document.createElement('img');
    img.src = "res/" + numberPng + ".png";
    img.classList.add("cardHolder");
    img.id = numberPng;
    img.setAttribute('onclick', 'selectCharacter(this)');

    spanContainer.appendChild(img);

    var i = 1;
    generateRandomSkills(numberPng).forEach(function (skill) {
        var skillImage = document.createElement('img');
        skillImage.src = skill;
        skillImage.classList.add("imageInImageContainer");
        if (i === 1) {
            skillImage.setAttribute("style", "left: 10px;");
        } else if (i === 2) {
            skillImage.setAttribute("style", "left: 50px;");
        } else {
            skillImage.setAttribute("style", "left: 90px;");
        }
        i++;
        spanContainer.appendChild(skillImage);
    });

    var price = document.createElement('i');
    price.classList.add("fa");
    price.classList.add("fa-money");
    price.classList.add("imageInImageContainer");
    price.setAttribute("style", "right: 0;");
    spanContainer.appendChild(price);

    document.getElementById("holodeck").appendChild(spanContainer);
}

function generateRandomSkills(characterNumber) {
    var array = [];

    while (array.length != characterNumber) {
        var number = Math.floor(Math.random() * 4) + 1;

        if (number === 1 && !array.includes("res/csharp.png")) {
            array.push("res/csharp.png");
        } else if (number === 2 && !array.includes("res/cobol.png")) {
            array.push("res/cobol.png");
        } else if (number === 3 && !array.includes("res/js.png")) {
            array.push("res/js.png");
        } else if (number === 4 && !array.includes("res/php.png")) {
            array.push("res/php.png");
        }
    }

    return array;
}

function generateAndCreateImage() {
    var number = Math.floor(Math.random() * 3) + 1;
    addTheImage(number);
}

function generateAndCreateField() {
    var number = Math.floor(Math.random() * 3) + 1;
    addTheField(number);
}

function generateAndCreate5Cards() {
    var maxCards = 5;
    if (currenTurn == 1 || currenTurn % 5 == 0) {
        maxCards = 4;
    }

    for (var i = 0; i < maxCards; i++) {
        generateAndCreateImage();
    }

    if (currenTurn == 1 || currenTurn % 5 == 0) {
        generateAndCreateField();
    }
}

function rerollCards() {
    if (golds - 5 >= 0) {
        remove5Cards();
        generateAndCreate5Cards();
        addGolds(-5);
    }
}

function remove5Cards() {
    var list = document.getElementsByClassName("cardHolder");

    for (var i = list.length - 1; 0 <= i; i--) {
        if (list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
        }
    }
}

function changeTurn() {
    addTurn();
    remove5Cards();
    generateAndCreate5Cards();
    addGolds(10);
    addExp(50);
    updateFamilies();
}

function selectField(img) {
    if (golds - (img.id) >= 0) {

        img.removeAttribute("onclick");
        
        
        addGolds(-(img.id));

        document.body.setAttribute("style", "background-image: url('" + img.src + "'); background-size: 100% 100%");
        img.src = "res/empty.png";
    }
}

function selectCharacter(img) {
    if (golds - img.id >= 0) {
        img.src = "res/empty.png";
        img.removeAttribute("onclick");

        var skills = [];
        var list = img.parentElement.children;
        for (var i = list.length - 1; 0 <= i; i--) {
            if (list[i].className === "imageInImageContainer") {
                if (list[i].src.includes("res/csharp.png")) {
                    skills.push("C#");
                } else if (list[i].src.includes("res/cobol.png")) {
                    skills.push("COBOL");
                } else if (list[i].src.includes("res/js.png")) {
                    skills.push("JS");
                } else if (list[i].src.includes("res/php.png")) {
                    skills.push("PHP");
                }

                list[i].remove();
            }
        }
        addGolds(-img.id);

        playerArray.push({
            character: img.id,
            skills: skills
        });

        var a = 0;
    }
    updateFamilies();
}

function levelUp() {
    if (golds - 10 >= 0) {
        addExp(50);
        addGolds(-10);
    }
}

function addGolds(number) {
    if (Number.isInteger(number)) {
        golds += number;
    }
    displayGolds();
}

function addExp(number) {
    if (Number.isInteger(number)) {
        exp += number;
    }
    displayExp();
}

function addTurn() {
    currenTurn += 1;
    displayTurn();
}

function endGame() {
    updateFamilies();
    calculPoints()
}

function calculPoints() {
    var totalPoints = 0;

    const languageMap = new Array();

    playerArray.forEach(function (element) {
        element.skills.forEach(function (skillElement) {
            if (languageMap[skillElement] == null) {
                languageMap[skillElement] = 1;
            } else {
                languageMap[skillElement] += 1;
            }
        });
    });

    Object.values(languageMap).forEach(function (element) {
        totalPoints += element;
    });

    document.getElementById("scoreEnd").innerHTML = totalPoints;
    document.getElementById("scoreEnd").style("scoreEndCard", "visible");

    document.getElementById
}

function updateFamilies() {
    const languageMap = new Array();

    playerArray.forEach(function (element) {
        element.skills.forEach(function (skillElement) {
            if (languageMap[skillElement] == null) {
                languageMap[skillElement] = 1;
            } else {
                languageMap[skillElement] += 1;
            }
        });
    });

    for (var i = 0; i < Object.keys(languageMap).length; i++) {
        var element = Object.keys(languageMap)[i];
        var number = languageMap[element];
        if (element === "C#") {
            document.getElementById("csharpCounter").innerHTML = number;
        }
        if (element === "COBOL") {
            document.getElementById("cobolCounter").innerHTML = number;
        }
        if (element === "JS") {
            document.getElementById("jsCounter").innerHTML = number;
        }
        if (element === "PHP") {
            document.getElementById("phpCounter").innerHTML = number;
        }
    }
}