window.onload = function() {
    this.generateAndCreate5Cards();
    displayGolds();
    displayExp();
};

var golds = 5;
var exp = 100;
var charactersArray = ['Alternant', 'Employee', 'Senior'];
var skillsArray = ['PHP', 'C#', 'JS', 'COBOL'];
var fieldArray = ['Web', 'Applicatif'];
var playerArray = []

function displayGolds(){
    document.getElementById("goldDisplayer").innerHTML = " " + golds;
}

function displayExp(){
    document.getElementById("expDisplayer").innerHTML = " " + Math.floor(exp/100);
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
    generateRandomSkills(numberPng).forEach(function(skill) {
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

function generateAndCreateImage(){
    var number = Math.floor(Math.random() * 3) + 1; 
    addTheImage(number);
}

function generateAndCreate5Cards(){
    for(var i=0; i < 5; i++){
        generateAndCreateImage();
    }
}

function rerollCards(){
    if(golds - 5 >= 0){
        remove5Cards();
        generateAndCreate5Cards();
        addGolds(-5);
    }
}

function remove5Cards(){
    var list = document.getElementsByClassName("cardHolder");
    
    for(var i = list.length - 1; 0 <= i; i--) {
        if(list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
        }
    }
}

function changeTurn(){
    remove5Cards();
    generateAndCreate5Cards();
    addGolds(10);
    addExp(50);
}

function selectCharacter(img) {
    if(golds - img.id >= 0){
        img.src = "res/empty.png";
        img.removeAttribute("onclick");

        var skills = [];
        var list = img.parentElement.children;
        for(var i = list.length - 1; 0 <= i; i--) {
            if(list[i].className === "imageInImageContainer") {
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
}

function levelUp(){
    if(golds-10 >= 0){
        addExp(50);
        addGolds(-10);
    }
}

function addGolds(number){
    if(Number.isInteger(number)){
        golds += number;
    }
    displayGolds();
}

function addExp(number){
    if(Number.isInteger(number)){
        exp += number;
    }
    displayExp();
}

function calculPoints(){
    var totalPoints = 0;

    const languageMap = skillsArray.map(x => 0);

    playerArray.forEach(function(element){
        element.skills.forEach(function(skillElement){
            languageMap[skillElement] += 1;
        });
    });
}