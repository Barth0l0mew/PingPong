
console.log(document.documentElement.clientWidth)    
class Rect {
    constructor(name,x,y,w,h,color){
        this.name = name
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.total=0
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h)
        
        ctx.closePath();
    }
}
let pong = document.querySelector('.pong');
// let total = document.querySelector('.total')
function init(){
    //  pong= document.querySelector('.pong');
    ctx = pong.getContext('2d')
    wid=pong.width=document.documentElement.clientWidth/2
 //   wid=pong.width = 500;
    hei=pong.height = document.documentElement.clientHeight/2   
 //hei=pong.height = 300;
    valX=valY =3;
    
     back = new Rect ('back',0,0,wid,hei,'rgba(0,0,0,0.5)')
    
    
     ai = new Rect ('Comp',0,50,20,100,'rgba(255,255,255,0.8)')
     player = new Rect ('Player',wid-20,50,20,100,'rgba(255,255,255,0.8)')
     ball = new Rect ('ball',0,0,20,20,'rgba(255,255,255,0.8)')
    // let ai = new Rect()
    draw();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.font = "bold "+hei/4+"px sans-serif";
    ctx.textBaseLine='center'
    ctx.textAlign='center'
    ctx.fillText('PINGPONG', wid/2,hei/2-50)
    ctx.fillText('CLICK ME', wid/2, hei/2+100);
    pong.onmousemove=playerMovies;
    //pong.onclick=play;
    pong.addEventListener('click',play)
    // setInterval(play,30)
    //play();
}

function collision (a,b){
   
    if (a.x+a.w>b.x&&
        a.x<b.x+b.h&&
        a.y+a.h>b.y&&
        a.y<b.y+b.h){
            return true
        }else{
            return false
        }
}
function playerMovies(event){
    let y = event.pageY-pong.offsetTop;
    if (player.h/2<y&&hei-player.h/2>y){
    player.y=y-player.h/2;
    }
   
    // console.log (`${y}  ${y-pong.offsetLeft}`)
    // total.innerHTML=`${y}  ${y-pong.offsetTop}`
}
function aiMovies(){
    let y,vY=Math.abs(valY)-2;
    if (ball.y<ai.y+ai.h/2){
        y=ai.y-vY;
    }else {
        y=ai.y+vY;
    }
    if (ai.h/2<y&&hei-ai.h/2>y){
        ai.y=y
    }
}
function position (){
     if (ball.x+valX>wid){

            console.log(ball.x+valX)
                ai.total++
            }else if (ball.x<0){
                player.total++
            }
    if (ai.total>=10){
        win(ai)
        
    }
    if (player.total>=10){
        win(player)
       
    }
    ball.x+valX>wid||ball.x<0?valX*=-1:valX
    ball.y+valY>hei||ball.y<0?valY*=-1:valY
    if (collision(player,ball)&&valX>0||collision(ai,ball)&&valX<0){
if (valX < 9 && -9 < valX) {
            if (valX < 0) {
                valX--;
            } else {
                valX++;
            }
            if (valY < 0) {
                valY--;
            } else {
                valY++;
            }
        }
        valX=-valX
    }
   console.log (valX,valY)
    ball.x+=valX;
    ball.y+=valY;
    aiMovies();
}
function draw (){
   
    back.draw();
     for (let i=0; i<hei; i+=100){
        ctx.fillStyle='rgba(255,255,255,0.8)'
        ctx.fillRect(wid/2-15, i, 30, 50)
    }
     ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "bold "+hei/4+"px sans-serif";
    ctx.fillText(ai.total, wid/4, hei/4);
    ctx.fillText(player.total, 3*wid/4, hei/4);

    ai.draw();
    player.draw();
    ball.draw();
}
function win (obj){
    cancelAnimationFrame(pongPlay);
    back.draw();
    ctx.fillStyle = "rgba(255,0,0,0.8)";
    ctx.textAlign='top';
    ctx.textBaseLine='center';
    ctx.fillText('WIN'+obj.name,wid/2,hei/2)
}
function play (){
    pong.removeEventListener('click',play)
    draw();
    position();
     pongPlay= requestAnimationFrame(play)
    //    cancelAnimationFrame(pongPlay); 

}
init();