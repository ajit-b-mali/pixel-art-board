/**
 * @type HTMLCanvasElement
 */


const canvas = document.getElementById('canvas1'),
      guide = document.getElementById('guide'),
      colorInput = document.getElementById('colorInput'),
      toggleGuide = document.getElementById('toggleGuide'),
      clearBtn = document.getElementById('clearBtn'),
      ctx = canvas.getContext('2d'),

      CANVASWIDTH = canvas.width = 450,
      CANVASHEIGHT = canvas.height = 450,
      CELL_SIDE_COUNT = 15,
      CellPixelLenght = CANVASWIDTH / CELL_SIDE_COUNT,
      colorHistory = {};

//set default color
colorInput.value = '#009578'

//initialize the CAnvas
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
let draw = false;
{
    guide.style.width = `${CANVASWIDTH}px`;
    guide.style.height = `${CANVASHEIGHT}px`;
    guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
    
    [...Array(CELL_SIDE_COUNT ** 2)].forEach(() => guide.insertAdjacentHTML("beforeend", "<div></div>"));
}

function handleCanvasMousedown(e){
    //Ensure the click is primary key
    if(e.button != 0) return;
    draw = true;
    const canvasBoundingRect = canvas.getBoundingClientRect(),
          x = e.clientX - canvasBoundingRect.left,
          y = e.clientY - canvasBoundingRect.top,

          cellX = Math.floor(x / CellPixelLenght),
          cellY = Math.floor(y / CellPixelLenght),

          currentColor = colorHistory[`${cellX}_${cellY}`];

    if (e.ctrlKey){
        if (currentColor) {
            colorInput.value = currentColor;
        }
    }else{
        fillCell(cellX, cellY);
    }

}

function handleCanvasMouseUp(){
    draw = false;
}

function handleCanvasMousemove(e){
    //Ensure the click is primary key
    if(draw != true) return;

    const canvasBoundingRect = canvas.getBoundingClientRect(),
          x = e.clientX - canvasBoundingRect.left,
          y = e.clientY - canvasBoundingRect.top,

          cellX = Math.floor(x / CellPixelLenght),
          cellY = Math.floor(y / CellPixelLenght);


    fillCell(cellX, cellY);
}

function handleClearBtnClick(){
    const yes = confirm("Are you Sure?");
    if(!yes) return;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    
}

function handleToggleGuideChange(){
    guide.style.display = toggleGuide.checked ? null : "none";
}

function fillCell(cellX, cellY){
    const x = cellX * CellPixelLenght,
          y = cellY * CellPixelLenght;

    ctx.fillStyle = colorInput.value;

    ctx.fillRect(x, y, CellPixelLenght, CellPixelLenght)
    colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

canvas.addEventListener('mousedown', handleCanvasMousedown);
clearBtn.addEventListener('click', handleClearBtnClick);
toggleGuide.addEventListener('change', handleToggleGuideChange);
canvas.addEventListener('mousemove', handleCanvasMousemove);
window.addEventListener('mouseup', handleCanvasMouseUp);
