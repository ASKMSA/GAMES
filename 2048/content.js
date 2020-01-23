function emptyGrid() {
  return [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
}

function compare(a, b) 
{
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      if (a[i][j] !== b[i][j]) 
      {
        return true;
      }
    }
  }
  return false;
}

function copyGrid(grid) 
{
  let new_copy = emptyGrid();
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      new_copy[i][j] = grid[i][j];
    }
  }
  return new_copy;
}

function flipGrid(grid) 
{
  for (let i = 0; i < 4; i++) 
  {
    grid[i].reverse();
  }
  return grid;
}

function transGrid(grid) 
{
  let newGrid = emptyGrid();
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}


var grid;
var grid_new;
var score = 0;
var cnv;

function centerCanvas() {
  cnv.position((windowWidth-400) / 2, (windowHeight+350) / 2);
}
function windowResized() {
  centerCanvas();
}

function setup() {
  cnv=createCanvas(400,400);
  centerCanvas();
  noLoop();
  grid = emptyGrid();
  grid_new = emptyGrid();
  addNumber();
  addNumber();
  updateCanvas();
}
function addNumber() 
{
  let options = [];
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      if (grid[i][j] === 0) 
      {
        options.push({x: i,y: j});
      }
    }
  }
  if (options.length > 0) 
  {
    let spot = random(options);
    grid[spot.x][spot.y] = random(1) > 0.3 ? 2 : 4;    
    grid_new[spot.x][spot.y] = 1;
  }
}
function updateCanvas() 
{
  background(206,227,151);
  drawGrid();
  select('#score').html(score);             
}
  
function operate(row)
 {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function keyPressed()
{ 
  let flipped = false;
  let rotated = false;
  let played = true;
  console.table(grid);
  switch (keyCode) 
  {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      console.table(grid);

      break;
    case RIGHT_ARROW:
      grid = transGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let savegrid = copyGrid(grid);
    for (let i = 0; i < 4; i++)
    {
      grid[i] = operate(grid[i]);
    }
    console.table(grid);
    let changed = compare(savegrid, grid);
    if (flipped) 
    {
      grid = flipGrid(grid);
      console.table(grid);

    }
    if (rotated)
     {
      grid = transGrid(grid);
    }
    if (changed)
     {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) 
    {
      alert("Game Over! Better luck next time");
    }

    let gamewon = isGameWon();
    if (gamewon) 
    {
      alert("Congrats! You won");
    }
  }
}

function slide(row)
{
  let arr = row.filter((val) => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row) 
{
  for (let i = 3; i >= 1; i--) 
  {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) 
    {
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

function drawGrid() 
{
  let x = 100;
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      strokeWeight(4);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) 
      {
        stroke(94,143,93);
        strokeWeight(8);
        grid_new[i][j] = 0;
      } 
      else 
      {
        strokeWeight(4);
        stroke(0);
      }

      if (val != 0)
      {
        fill(colorsSizes[s].color);
      } 
      else 
      {
        noFill();
      }
      rect(i * x, j * x, x, x,25);
      if (val !== 0) 
      {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(2);
        textSize(colorsSizes[s].size);
        text(val, i * x + x / 2, j * x + x / 2);
      }
    }
  }
}

function isGameWon() 
{
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      if (grid[i][j] == 2048) 
      {
        return true;
      }
    }
  }
  return false;
}

function isGameOver() 
{
  for (let i = 0; i < 4; i++) 
  {
    for (let j = 0; j < 4; j++) 
    {
      if (grid[i][j] == 0) 
      {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) 
      {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) 
      {
        return false;
      }
    }
  }
  return true;
}



let colorsSizes = 
{
  '2': 
  {
    size: 64,
    color: '#FFD800'
  },
  '4': 
  {
    size: 64,
    color: '#40e68b'
  },
  '8': 
  {
    size: 64,
    color: '#E0777D'
  },
  '16': 
  {
    size: 64,
    color: '#FFC15E'
  },
  '32': 
  {
    size: 64,
    color: '#10d909'
  },
  '64': 
  {
    size: 64,
    color: '#E0777D'
  },
  '128': 
  {
    size: 36,
    color: '#ff8ba7'
  },
  '256': 
  {
    size: 36,
    color: '#F1C5FF'
  },
  '512': 
  {
    size: 36,
    color: '#f17362'
  },
  '1024': 
  {
    size: 36,
    color: '#24FFC1'
  },
  '2048': 
  {
    size: 36,
    color: '#A659A9'
  }
};







