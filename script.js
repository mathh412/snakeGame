var tamanho = 20;
var position={x:5,y:3}
var snake = [];
var square = [];
var snakeTam=6;
var last = null;
var c= document.getElementById("myCanvas");
var squareW=Number(c.width)/tamanho;
var squareH=Number(c.height)/tamanho;
var ctx=c.getContext("2d");
var foodDraw = 0;
var rand=0;
var comeu=0;
var test2=false;
var button=false
document.getElementById("gameover").disabled=true;

for(i=0;i<tamanho;i++)
   {
    square[i]=[];
   }


function moviment()
{
if(!test2)
{
 if (last == "w" )
 {
   position.y-=1;
 }
 if (last == "s") 
{
   
   position.y+=1;
}
 if (last == "a") 
 {
    
   position.x-=1;
 }
 if (last == "d") 
 {

   position.x+=1;
 } 
}
}

function snakeF()
{
comeu = 0;
if(!test2)
{
 for(i=snakeTam-1;i>0;i--)
 {

    if(last!=null)
    {
      if(snake[i].y>=0 && snake[i].x>=0 && snake[i].y<=20 && snake[i].x<=20 )
    square[snake[i].y][snake[i].x]=null;
    snake[i].x=snake[i-1].x
    snake[i].y=snake[i-1].y
    }
    else
    {
      snake[i]=new Object()
      snake[i].x= position.x - i;
      snake[i].y= position.y;
    }

   }
    snake[0]=new Object()
    snake[0].x= position.x;
    snake[0].y= position.y;
}
    for(i=0;i<snakeTam;i++)
    {
      if(snake[i].y>=0 && snake[i].x>=0 && snake[i].y<=20 && snake[i].x<=20 )
      {
      if(i%35<5  && i<5)
      square[snake[i].y][snake[i].x]="rgb(0,"+(255/4*((i%5)))+",0)";
      if(i%35<5  && !(i<5))
         square[snake[i].y][snake[i].x]="rgb(0,"+(255/5*((i%5)+1))+",0)";
      if(i%35>=5 && i%35<10 )
         square[snake[i].y][snake[i].x]="rgb("+(255/5*((i%5)+1))+",255,0)";
      if(i%35>=10 && i%35<15 )
         square[snake[i].y][snake[i].x]="rgb(255,"+(255-(255/5*((i%5)+1)))+",0)";
      if(i%35>=15 && i%35<20)
         square[snake[i].y][snake[i].x]="rgb("+(255-(255/5*((i%5)+1)))+",0"+","+(255/5*((i%5)+1))+")";
      if(i%35>=20 && i%35<25)
         square[snake[i].y][snake[i].x]="rgb(0,"+(255/5*((i%5)+1))+",255)";
      if(i%35>=25 && i%35<30)
         square[snake[i].y][snake[i].x]="rgb("+(255/5*((i%5)+1))+",255,255)";
      if((i%35>=30 && i%35<35))
         square[snake[i].y][snake[i].x]="rgb("+(255-(255/5*((i%5)+1)))+","+(255-(255/5*((i%5)+1)))+","+(255-(255/5*((i%5)+1)))+")";
   }
   }
   document.getElementById("points").innerHTML="pontos: "+((snakeTam-5)*25)
 }




function keys(k)
{
if(k.key =="w" && !(snake[0].y-1==snake[1].y))
{
   last ="w";
}
if(k.key =="s" && !(snake[0].y+1==snake[1].y))
{
   last ="s";
}
if(k.key =="d" && !(snake[0].x+1==snake[1].x))
{
    last ="d";
}
 if(k.key =="a" && !(snake[0].x-1==snake[1].x))
 {
    last ="a";
 }

}
function map()
{
 for(i=0;i<tamanho;i++)
{
for(j=0;j<tamanho;j++)
{
   if(square[i][j])
   ctx.fillStyle=square[i][j];
   else
   ctx.fillStyle="rgb(185, 142, 169)"
 ctx.fillRect(50*j+1, 50*i+1, squareW-2, squareH-2);
}
}
}

function Food()
{
 var test=0;

 while(test==0){
   rand = Math.floor(Math.random()*19)
 for(i=0;i<snakeTam;i++)
    {
    if (!(rand == snake[i].x || rand == snake[i].y))
      test=1;
    }
 }
square[rand][rand]="rgb(255,0,255)"
foodDraw = 1;
}

function snakeEated()
{

    for(i=0;i<snakeTam;i++)
        {
       if(rand == snake[i].x && rand== snake[i].y)
       {
         foodDraw = 0;
         snakeTam+=1;
         snake[snakeTam-1] = new Object();
         snake[snakeTam-1].x=rand;
         snake[snakeTam-1].y=rand;
         break;
       }
        }
}
function gameOver()
{
  if(position.x <0 || position.x >tamanho || position.y<0 || position.y >tamanho)
  return true;
 for(i=1;i<snakeTam;i++)
 {
for(j=1;j<snakeTam;j++)
{
   if(i!=j)
   {
      if(snake[i].x ==snake[j].x && snake[i].y == snake[j].y && snake[i].x !=rand && snake[i].y != rand )
         return true;
   }
}
 }
 return false
}

function game()
{
   moviment();
   snakeF();
    if(foodDraw)
    snakeEated();
    else
     {
     Food();
     }
   
      if(gameOver())
         {
         last=1;
      document.getElementById("gameover").disabled=false
      document.getElementById("gameover").style.opacity="100"
      document.getElementById("game-over").style.opacity="100"
      }
      else
      {
         window.addEventListener("keydown",keys);
      }

      if(button)
      {
         last=null;
         snakeTam=6;
         position={x:5,y:3}
         for(i=0;i<tamanho;i++)
            {
             for(j=0;j<tamanho;j++)
                {
                square[i][j]=null;
                }

            }
        for(i=1;i<6;i++)
        {
        snake[i].x= position.x - i;
      snake[i].y= position.y;
        }
        snake[0].x=position.x;
        snake[0].y=position.y;
        foodDraw=0
        button=false
     document.getElementById("gameover").disabled=true
      document.getElementById("gameover").style.opacity="0"
      document.getElementById("game-over").style.opacity="0"
         }
    map();
    test2=gameOver()
    
console.log(gameOver())

    
}




setInterval(game,70) 