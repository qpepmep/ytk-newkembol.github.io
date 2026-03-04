// Меню
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Плавная прокрутка
document.getElementById("scrollBtn").addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
});

// СНЕГ
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

for(let i=0;i<150;i++){
    snowflakes.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*3+1,
        d:Math.random()*1
    });
}

function drawSnow(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    ctx.beginPath();
    snowflakes.forEach(f=>{
        ctx.moveTo(f.x,f.y);
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
    });
    ctx.fill();
    moveSnow();
}

function moveSnow(){
    snowflakes.forEach(f=>{
        f.y+=Math.pow(f.d,2)+1;
        if(f.y>canvas.height){
            f.y=0;
            f.x=Math.random()*canvas.width;
        }
    });
}

setInterval(drawSnow,33);

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});