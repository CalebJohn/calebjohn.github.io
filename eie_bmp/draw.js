var rectCanvas = document.getElementById("rect_canvas");
var rectCtx = rectCanvas.getContext("2d");
rectCanvas.addEventListener("touchstart", handleStart, false);
rectCanvas.addEventListener("touchend", handleEnd, false);
rectCanvas.addEventListener("touchleave", handleEnd, false);
rectCanvas.addEventListener("touchmove", handleMove, false);
var mouse_is_down = false;
var cursor_x;
var cursor_y;
var touch;
var cropRect = [0, 0, 0, 0];

function findPos(obj) { // thanks to http://wayneburkett.com/ for this function
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function drawRect(e) {
    clear();
    rectCtx.beginPath();
    var pos = findPos(rectCanvas)
    var x = (e.pageX - pos.x);
    var y = (e.pageY - pos.y);
    rectCtx.rect(cursor_x, cursor_y, x - cursor_x, y - cursor_y);
    rectCtx.stroke();
}
  
function mousedown(e) {
    mouse_is_down = true;
    var pos = findPos(rectCanvas)
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    cursor_x = x;
    cursor_y = y;
  }

function mouseup(e) {
  if (mouse_is_down) {
    mouse_is_down = false;
    drawRect(e);

    var pos = findPos(rectCanvas)
    var x = (e.pageX - pos.x);
    var y = (e.pageY - pos.y);

    if (x > width * 4)
      x = width * 4;
    if (y > height * 4)
      y = height * 4;

    // Allow drawing a rect in any direction
    var cx = cursor_x;
    var cy = cursor_y;
    if (x < cx) cx = x;
    if (y < cy) cy = y;
    cropRect = [cx, cy, Math.abs(x - cursor_x), Math.abs(y - cursor_y)];
    drawInput(cropRect, "crop");
  }
}
  
function mousemove(e) {
    if (mouse_is_down)
    {
      drawRect(e);
    }
  }
  
function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
        
  mousedown(touches[0])
  }

function handleMove(evt) {
  evt.preventDefault();

  var touches = evt.changedTouches;
  
  mousemove(touches[0])
}

function handleEnd(evt) {
  evt.preventDefault();
  
  var touches = evt.changedTouches;
        
  mouseup(touches[0])
}

function clear() {
    // rectCanvas.width = rectCanvas.width;
    rectCtx.clearRect(0, 0, 512, 256);
  }

rectCanvas.onmousedown = mousedown;
rectCanvas.onmouseup = mouseup;
rectCanvas.onmousemove = mousemove;
rectCanvas.onmouseout = mouseup;
