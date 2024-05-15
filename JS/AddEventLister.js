// AddeventLister javascript start

// ===================== Longcut  =======================

// document.getElementById("img1").onmouseover = abc;
// function abc(){
//         document.getElementById("img1").style.filter = "grayscale(0%)";
// }
// document.getElementById("img1").onmouseout = xyz;
// function xyz(){
//         document.getElementById("img1").style.filter = "grayscale(100%)";
// }

// second Image

// document.getElementById("img2").onmouseover = PQR;
// function PQR(){ 
//         document.getElementById("img2").style.filter = "grayscale(0%)";
// }
// document.getElementById("img2").onmouseout = STU;
// function STU(){
//         document.getElementById("img2").style.filter = "grayscale(100%)";
// }

// ===================== Shortcut  =======================


document.getElementById("img1").addEventListener("mouseover",function(){
    this.style.filter="grayscale(0%)";
});
document.getElementById("img1").addEventListener("mouseout",function(){
    this.style.filter="grayscale(100%)";
});

// -- second image

document.getElementById("img2").addEventListener("mouseover",function(){
    this.style.filter="grayscale(0%)";
});
document.getElementById("img2").addEventListener("mouseout", function(){
    this.style.filter="grayscale(100%)";
});

// AddeventLister javascript End