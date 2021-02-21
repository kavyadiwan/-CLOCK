//Create a canvas object
var canvas = document.getElementById("canvas");
//Create a 2d drawing
var ctx = canvas.getContext("2d");
//calculate the clock radius
var radius = canvas.height/2;
ctx.translate(radius,radius);
//Reduce the radius to 90%
radius = radius * 0.90;
//Call the drawClock for every 1000 millisecond
setInterval(drawClock,1000);

function drawClock(){
    drawface(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}

function drawface(ctx,radius){
    //White circle
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    //border
    var grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,"grey");
    grad.addColorStop(0.5,"gray");
    grad.addColorStop(1,"black");
    ctx.strokeStyle=grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    //Inner circle
    ctx.beginPath();
    ctx.arc(0,0,radius*0.1,0,2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
    
}

function drawNumbers(ctx,radius){
    //set the font
    ctx.font = radius*0.15+"px arial";
    //align the text
    ctx.textBaseline = "middle";
    ctx.textAlign="center";

    var num;
    for(num=1;num<=12;num++){
    var ang = num*Math.PI/6;
    ctx.rotate(ang);
    ctx.translate(0,-radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(),0,0);
    ctx.rotate(ang);
    ctx.translate(0,radius*0.85);
    ctx.rotate(-ang);
    }
}

function drawTime(ctx,radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

   // Calculate the angle of hour hand
   hour = hour%12;
   hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(6*60*60));
    drawHand(ctx,hour,radius*0.5,radius*0.07);

    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx,minute,radius*0.8,radius*0.07);

    second = second*Math.PI/30;
    drawHand(ctx,second,radius*0.9,radius*0.02);
}

function drawHand(ctx,ang,length,width){
    ctx.beginPath();
    ctx.lineWidth=width;
    ctx.lineCap="round";
    ctx.moveTo(0,0);
    ctx.rotate(ang);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-ang);
}
