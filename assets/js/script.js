const colorCircle = document.querySelectorAll(".color-circle");

let penSize = 3;
let isDrawing;
let x;
let y;

let restore_array = [];
let index = -1;

var canvas = document.querySelector("canvas")
c = canvas.getContext("2d");

canvas.addEventListener("mousedown", (e)=>{
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;

  
});

canvas.addEventListener("mouseup",()=>{
    isDrawing = false;
    x = undefined;
    y = undefined;

    
    restore_array.push(c.getImageData(0, 0 , canvas.width, canvas.height));
    index += 1;
    
   
    console.log(restore_array)
});

canvas.addEventListener('mousemove',(event)=>{
    draw(event.offsetX, event.offsetY)
});

c.fillStyle = "black";
c.strokeStyle = c.fillStyle;

function draw(x2,y2){
    if(isDrawing){
        c.beginPath();
        c.arc(x2, y2, penSize,0 , Math.PI * 2)
        c.closePath();
        c.fill();
        
    //DESENHAR LINHA
    drawLine(x, y, x2, y2)
    }

    x = x2;
    y = y2;  
}

function drawLine(x1, y1, x2, y2){
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
}

document.querySelector(".clear").addEventListener("click", ()=>{
    c.clearRect(0,0, canvas.width, canvas.height);
    restore_array = [];
    index = -1;
})

const selectColor = (elem) =>{

    removeActiveCircleColor();

    c.fillStyle = elem.getAttribute("data-color")
    elem.classList.add("active")
}

const removeActiveCircleColor = () =>{
    colorCircle.forEach((circle)=>{
        circle.classList.remove("active");
    });
}

function penSizeChange(pensize){
    penSize = pensize
}

const favColor = (elem) =>{
    removeActiveCircleColor();
    c.fillStyle = elem.value;
}

document.querySelector("a").addEventListener("click", (event)=> event.target.href = canvas.toDataURL())


function undo_last(){
    if(index <= 0){
        c.clearRect(0,0, canvas.width, canvas.height);
    }else{
        index -= 1;
        restore_array.pop();
        c.putImageData(restore_array[index], 0, 0);
    }
}