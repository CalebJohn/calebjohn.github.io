var canvas = document.getElementById("Canvas");
var holder = document.getElementById("Holder");
canvas.width = holder.offsetWidth
canvas.height = window.innerHeight * 0.7;
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

function drawCircle(e) {
    var pos = findPos(canvas)
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    cursor_x = x;
    cursor_y = y;
  }
  
function drawLine(e) {
    var pos = findPos(canvas)
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
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
canvas.onmouseout = mouseup;