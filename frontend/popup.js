
var images = new Array();
var x = 0;
var repeat;
images[0] = new Image();
images[0].src = 'src/pictures/image1.png';
images[1] = new Image();
images[1].src = 'src/pictures/image2.png';
images[2] = new Image();
images[2].src = 'src/pictures/image3.png';

function displayImage() {
    if(x == 0) {
        document.getElementById("img").src = images[0].src;
        x = 1;
    } else if(x == 1){
        document.getElementById("img").src = images[1].src;
        x = 2;
    } else {
        document.getElementById("img").src = images[2].src;
        x = 0;
        clearInterval(repeat);
    }
    
}

function startTimer() {
    repeat = setInterval(displayImage, 500);
}

window.onload = function() {document.getElementsByClassName('play')[0].onclick = function() {startTimer();}}