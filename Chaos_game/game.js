let x1, y1 ,x2, y2, x3, y3 ,x, y;
var cnv;

  

function setup() 
{
    
  cnv=createCanvas(windowWidth*0.6,windowHeight*0.45);
  centerCanvas();
  x1 = random(width);
  y1 = random(height);
  x2 = random(width);
  y2 = random(height);
  x3 = random(width);
  y3 = random(height);
  x = random(width);
  y = random(height);
  stroke(255);
  strokeWeight(8);
  point(x1, y1);
  point(x2, y2);
  point(x3, y3);
}
function windowResized() 
{
    resizeCanvas(windowWidth*0.5,windowHeight*0.6);
    centerCanvas();
    canvas.parent('sketch-holder');
    location.reload(true);
}
function centerCanvas() 
{
    cnv.position(windowWidth*0.2,windowHeight*0.50);

}
window.addEventListener('resize', windowResized);
function draw()
{

  for (let i = 0; i < 5; i++) 
  {
    strokeWeight(4);
    point(x, y);

    let r = ceil(random(3));
    if (r == 1) 
    {
      stroke('#F22F08');
      x = (x+x1)/2;
      y = (y+y1)/2;

    } else if (r == 2) 
    {
      stroke('#B9C406');
      x = (x+x2)/2;
      y = (y+y2)/2;
    } else if (r == 3) 
    {    
      stroke('#0294A5');
      x = (x+x3)/2;
      y = (y+y3)/2;
    }
  }
}