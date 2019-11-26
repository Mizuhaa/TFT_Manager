window.onload = function() {
    this.generateAndCreate5Cards();
};

var golds = 0;
var exp = 100;

function addTheImage(numberPng) {
    var img = document.createElement('img');
    img.src = "res/" + numberPng + ".png";
    img.classList.add("cardHolder");
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

