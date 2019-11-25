window.onload = function() {
    this.generateAndCreate4Images();
};

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

function generateAndCreate4Images(){
    for(var i=0; i < 5; i++){
        generateAndCreateImage();
    }
}

function rerollCards(){
    remove4Cards();
    generateAndCreate4Images();
}

function remove4Cards(){
    var list = document.getElementsByClassName("cardHolder");
    
    for(var i = list.length - 1; 0 <= i; i--) {
        if(list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
        }
    }
}