window.onload = function() {
    this.generateAndCreate5Cards();
};

<<<<<<< HEAD
var golds = 0;
var exp = 100;
=======
var charactersArray = ['Alternant', 'Employee', 'Senior'];
var skillsArray = ['PHP', 'C#', 'JS', 'COBOL'];
var fieldArray = ['Web', 'Applicatif'];
var playerArray = []

>>>>>>> 3afa3387444b314bf3ee710422f0c733a0c70882

function addTheImage(numberPng) {
    var img = document.createElement('img');
    img.src = "res/" + numberPng + ".png";
    img.classList.add("cardHolder");
    img.id = numberPng;
    img.setAttribute('onclick', 'selectCharacter(this)');
    document.getElementById("holodeck").appendChild(img);
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
    remove5Cards();
    generateAndCreate5Cards();
}

function remove5Cards(){
    var list = document.getElementsByClassName("cardHolder");
    
    for(var i = list.length - 1; 0 <= i; i--) {
        if(list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
        }
    }
}

<<<<<<< HEAD
function gainGolds(){
    golds = golds + 10;

}

function gainExp(){
    exp = exp + 50;
}

function changeTurn(){
    generateAndCreate5Cards();
    gainGolds();
    gainExp();
}

=======
function selectCharacter(img) {
    var a = 0;
}
>>>>>>> 3afa3387444b314bf3ee710422f0c733a0c70882
