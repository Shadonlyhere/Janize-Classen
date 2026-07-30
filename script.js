/* ===========================================
   SCRIPT.JS - PART 1
=========================================== */

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

const progressBar = document.getElementById("progressBar");

const music = document.getElementById("bgMusic");

const popup = document.getElementById("popup");

/* Start */

showSlide(currentSlide);

/* Show Slide */

function showSlide(index){

slides.forEach(slide=>{

slide.classList.remove("active");

});

slides[index].classList.add("active");

updateProgress();

}

/* Next */

function nextSlide(){

if(currentSlide < slides.length-1){

currentSlide++;

showSlide(currentSlide);

}

}

/* Previous */

function previousSlide(){

if(currentSlide>0){

currentSlide--;

showSlide(currentSlide);

}

}

/* Progress */

function updateProgress(){

let percent=((currentSlide+1)/slides.length)*100;

progressBar.style.width=percent+"%";

}

/* Popups */

function showPopup(message){

popup.innerHTML=message;

popup.style.display="block";

setTimeout(()=>{

popup.style.display="none";

},2500);

}

/* Funny Answers */

function wrongPerson(){

showPopup("🚫 Access Denied.<br><br>We knew this wasn't Janize.");

}

function invalidAnswer(){

showPopup("😂 Invalid Answer.<br><br>Please ask the Quality & Efficiency Department again.");

}

/* Celebration */

function celebrate(){

showPopup("🎉 Identity Confirmed! Welcome Janize!");

launchConfetti();

setTimeout(()=>{

nextSlide();

},1800);

}

/* Music */

document.body.addEventListener("click",function(){

if(music){

music.volume=.35;

music.play().catch(()=>{});

}

},{once:true});

/* Keyboard Navigation */

document.addEventListener("keydown",function(e){

if(e.key==="ArrowRight"){

nextSlide();

}

if(e.key==="ArrowLeft"){

previousSlide();

}

});

/* Touch Swipe */

let touchStart=0;

let touchEnd=0;

document.addEventListener("touchstart",e=>{

touchStart=e.changedTouches[0].screenX;

});

document.addEventListener("touchend",e=>{

touchEnd=e.changedTouches[0].screenX;

handleSwipe();

});

function handleSwipe(){

if(touchStart-touchEnd>70){

nextSlide();

}

if(touchEnd-touchStart>70){

previousSlide();

}

}

/* Video */

const tributeVideo=document.getElementById("tributeVideo");

if(tributeVideo){

tributeVideo.onended=function(){

showPopup("❤️ Thank you for watching.");

};

}

/* ===========================================
   SCRIPT.JS - PART 2
=========================================== */

/* Canvas */

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

/* Confetti */

let confetti = [];

function launchConfetti(){

confetti = [];

for(let i=0;i<180;i++){

confetti.push({

x:Math.random()*canvas.width,

y:-20,

r:Math.random()*8+4,

dx:(Math.random()-0.5)*5,

dy:Math.random()*5+3,

rotation:Math.random()*360,

spin:(Math.random()-0.5)*10,

color:randomColor()

});

}

animateConfetti();

}

function randomColor(){

const colors=[

"#FFD700",

"#005EB8",

"#FFFFFF",

"#87CEFA",

"#F4C542"

];

return colors[Math.floor(Math.random()*colors.length)];

}

function animateConfetti(){

ctx.clearRect(0,0,canvas.width,canvas.height);

confetti.forEach(piece=>{

piece.x+=piece.dx;
piece.y+=piece.dy;
piece.rotation+=piece.spin;

ctx.save();

ctx.translate(piece.x,piece.y);

ctx.rotate(piece.rotation*Math.PI/180);

ctx.fillStyle=piece.color;

ctx.fillRect(-piece.r/2,-piece.r/2,piece.r,piece.r);

ctx.restore();

});

confetti=confetti.filter(piece=>piece.y<canvas.height+30);

if(confetti.length>0){

requestAnimationFrame(animateConfetti);

}

}

/* Smooth Fade Between Slides */

slides.forEach(slide=>{

slide.style.transition="opacity .8s ease, transform .8s ease";

});

/* End Screen */

const ending=document.getElementById("slide17");

if(ending){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

if(music){

music.volume=0.15;

}

launchConfetti();

}

});

});

observer.observe(ending);

}

/* Auto Pause Video When Leaving Slide */

if(tributeVideo){

document.addEventListener("click",()=>{

const videoSlide=document.getElementById("slide12");

if(!videoSlide.classList.contains("active")){

tributeVideo.pause();

}

});

}

/* Prevent Double Click Spam */

let locked=false;

const oldNext=nextSlide;

nextSlide=function(){

if(locked) return;

locked=true;

oldNext();

setTimeout(()=>{

locked=false;

},500);

};

/* Finished */

console.log("Janize Classen Tribute Website Loaded Successfully ❤️");