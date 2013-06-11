var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchleave", handleEnd, false);
canvas.addEventListener("touchmove", handleMove, false);
var mouse_is_down = false;
var cursor_x;
var cursor_y;
var strokeStyle = "black";
var touch;

function drawCircle(e) {
    var x = e.screenX;
    var y = e.screenY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    cursor_x = x;
    cursor_y = y;
  }
  
function drawLine(e) {
    var x = e.screenX;
    var y = e.screenY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(cursor_x, cursor_y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
function mousedown(e) {
    mouse_is_down = true;
    drawCircle(e);
  }

function mouseup(e) {
    mouse_is_down = false;
  }
  
function mousemove(e) {
    if (mouse_is_down)
    {
      drawLine(e);
      drawCircle(e);
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
    canvas.width = canvas.width;
  }
  
function black() {
    strokeStyle = "black";
  }
  
function red() {
    strokeStyle = "red";
  }
  
function green() {
    strokeStyle = "green";
  }
  
function blue() {
    strokeStyle = "blue";
  }

canvas.onmousedown = mousedown;
canvas.onmousemove = mousemove;
canvas.onmouseup = mouseup;