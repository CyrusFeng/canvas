let canvas = document.getElementById('canvas')

let penBtn = document.getElementById('penBtn')
let eraserBtn = document.getElementById('eraserBtn')
let deleteBtn = document.getElementById('deleteBtn')
let downloadBtn = document.getElementById('downloadBtn')

let blackBtn = document.querySelector('.black')

let redBtn = document.querySelector('.red')
let greenBtn = document.querySelector('.green')
let brownBtn = document.querySelector('.brown')
let blueBtn = document.querySelector('.blue')
let yellowBtn = document.querySelector('.yellow')
console.log(redBtn)

setCanvasSize(canvas)
let ctx = canvas.getContext('2d');

// ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
// ctx.fillStyle = '#dddddd'; // 设置颜色
// ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色


let prePoint = {
  x: 0,
  y: 0
}
let currentPoint = {
  x: 0,
  y: 0
}
let penOpened = true //是否开启画笔，默认为开启
let penUsed = false //是否使用画笔，默认为不使用
let eraserOpened = false //是否开启橡皮擦，默认为不开启
let eraserUsed = false //是否使用橡皮擦，默认为不使用
canvas.onmousedown = function (e) {

  let x = e.clientX
  let y = e.clientY

  prePoint.x = x
  prePoint.y = y

  // drawCircle(x, y, 10)
  if (eraserOpened) {
    eraserUsed = true
    ctx.clearRect(x - 10, y - 10, 20, 20);
  } else if (penOpened) {
    penUsed = true
  }
}

canvas.onmousemove = function (e) {
  let x = e.clientX
  let y = e.clientY

  if (eraserOpened && eraserUsed) {

    ctx.clearRect(x - 10, y - 10, 20, 20);

  } else if (penOpened && penUsed) {

    currentPoint.x = x
    currentPoint.y = y
    drawLine(prePoint.x, prePoint.y, currentPoint.x, currentPoint.y)
    prePoint.x = currentPoint.x
    prePoint.y = currentPoint.y

  }
}

canvas.onmouseup = function () {
  penUsed = false
  eraserUsed = false
}

canvas.ontouchstart = function (e) {
  console.log(e)
  let x = e.touches[0].clientX
  let y = e.touches[0].clientY

  prePoint.x = x
  prePoint.y = y

  // drawCircle(x, y, 10)
  if (eraserOpened) {
    eraserUsed = true
    ctx.clearRect(x - 10, y - 10, 20, 20);
  } else if (penOpened) {
    penUsed = true
  }
}
canvas.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
  let x = e.touches[0].clientX
  let y = e.touches[0].clientY

  if (eraserOpened && eraserUsed) {

    ctx.clearRect(x - 10, y - 10, 20, 20);

  } else if (penOpened && penUsed) {

    currentPoint.x = x
    currentPoint.y = y
    drawLine(prePoint.x, prePoint.y, currentPoint.x, currentPoint.y)
    prePoint.x = currentPoint.x
    prePoint.y = currentPoint.y

  }
}, { passive: false }) // passive 参数不能省略，用来兼容ios和android

// canvas.ontouchmove = function (e) {
//   e.preventDefault();
//
//   let x = e.touches[0].clientX
//   let y = e.touches[0].clientY
//
//   if (eraserOpened && eraserUsed) {
//
//     ctx.clearRect(x - 5, y - 5, 10, 10);
//
//   } else if (penOpened && penUsed) {
//
//     currentPoint.x = x
//     currentPoint.y = y
//     drawLine(prePoint.x, prePoint.y, currentPoint.x, currentPoint.y)
//     prePoint.x = currentPoint.x
//     prePoint.y = currentPoint.y
//
//   }
// }
canvas.ontouchend = function () {
  penUsed = false
  eraserUsed = false
}

function setCanvasSize(canvasElement) {
  let pageWidth = document.documentElement.clientWidth
  let pageHeight = document.documentElement.clientHeight

  canvasElement.width = pageWidth
  canvasElement.height = pageHeight
}

window.onresize = function () {
  setCanvasSize(canvas)
}

function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill()
}

function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  // ctx.strokeStyle = 'black'
  ctx.lineWidth = 5
  ctx.lineTo(endX, endY);
  ctx.stroke()
  ctx.closePath()
}


eraserBtn.onclick = function () {
  penOpened = false
  eraserOpened = true
  eraserBtn.classList.add('active')
  penBtn.classList.remove('active')
}
penBtn.onclick = function () {
  penOpened = true
  eraserOpened = false
  eraserBtn.classList.remove('active')
  penBtn.classList.add('active')
}
deleteBtn.onclick = function () {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}
downloadBtn.onclick = function () {
  let a = document.createElement('a')
  a.setAttribute("href", canvas.toDataURL("image/png"))
  a.download ='我的图画.png';
  a.target = '_blank'
  document.body.appendChild(a);
  // a.click()
  var clickevent = document.createEvent('MouseEvents');
  clickevent.initEvent('click', true, false);
  a.dispatchEvent(clickevent);
}
function activeColor(dom,className){
  dom.parentNode.childNodes.forEach(function (item) {
    if (item.nodeType == 1){
      if (item.className.indexOf(className) > -1){
        item.classList.add('active')
      }else{
        item.classList.remove('active')
      }
    }
  })
}

blackBtn.onclick = function () {
  ctx.strokeStyle = 'black'
  activeColor(this,'black')
}
redBtn.onclick = function () {
  ctx.strokeStyle = 'red'
  activeColor(this,'red')
}
greenBtn.onclick = function () {
  ctx.strokeStyle = 'green'
  activeColor(this,'green')
}
brownBtn.onclick = function () {
  ctx.strokeStyle = 'brown'
  activeColor(this,'brown')
}
blueBtn.onclick = function () {
  ctx.strokeStyle = 'blue'
  activeColor(this,'blue')
}
yellowBtn.onclick = function () {
  ctx.strokeStyle = 'yellow'
  activeColor(this,'yellow')
}
