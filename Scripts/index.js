const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const mouse={
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

const color_palate=['#A7D5F2','#590202','#8C0303','#5C5664','#024059','#0D0D0D','white'];

const gravity=1;
const friction_y=0.92;
const friction_x=0.999;
const n=200;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    init();
})
window.addEventListener('click',function(event){
    init();
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Ball(x,y,dx,dy,radius,color)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=color;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        c.closePath();
    };
    this.update=function(){
        if((this.y-this.radius)<=0)
            this.dy=-this.dy;
        if((this.y+this.radius+this.dy)>=canvas.height)
        {
            this.dy=-this.dy*friction_y;
            this.dx*=friction_x;
        }
        else
        {
            this.dy+=gravity;
            console.log(this.dy);
        }
        if((this.x+this.radius)>=canvas.width || (this.x-this.radius)<=0)
        {
            this.dx*=friction_x;
            this.dx=-this.dx;
        }
        this.y+=this.dy;
        this.x+=this.dx;
        this.draw();
    };
}

//Implementation
let ballArray;
function init(){
    ballArray=[]
    for(let i=0;i<n;i++)
    {
        const radius=randomIntFromRange(10,50);
        const x=randomIntFromRange(radius,canvas.width-radius);
        const y=randomIntFromRange(radius,(canvas.height/2));
        const dx=randomIntFromRange(-2,2);
        ballArray.push(new Ball(x,y,dx,20,radius,randomColor(color_palate)));
    }
}

//Animation logo
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    // c.fillText(" HTML CANVAS BOILERPLATE",mouse.x,mouse.y);
    for(let i=0;i<ballArray.length;i++)
        ballArray[i].update();
}

init();
animate();