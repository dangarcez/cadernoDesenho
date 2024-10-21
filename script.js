
function criarQuadro(numPixels){
   [...areaDesenho.children].forEach(item=>{
      areaDesenho.removeChild(item)
   })
   for (let i=0;i<numPixels*numPixels;i++){
      let pixel = document.createElement("div")
      pixel.classList.add("pixel")
      pixel.style.cssText = `flex-basis:${screenSize/numPixels}px;height:${screenSize/numPixels}px;`
      pixel.setAttribute("draggable",false)
      areaDesenho.appendChild(pixel)
   }
}

function getRandomColor(){
   const randomNumber =Math.floor(Math.random()*256) 
   return randomNumber
}

function pintaPixel(pixel){
   pixel.classList.add("painted")
   pixel.style.backgroundColor= `rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`
}

//CONFIGS
let squareSize = 90
let screenSize = 480


const areaDesenho = document.querySelector("#areaDesenho")
const resetButton = document.querySelector("#resetButton")
const changeSizeButton = document.querySelector("#changeSizeButton")
let isDrawing = false


criarQuadro(16)

areaDesenho.addEventListener("mousedown", e=>{
   isDrawing = true;
   if(e.target.classList.contains("pixel")){
      pintaPixel(e.target)
   }
})

areaDesenho.addEventListener("mouseup", e=>{
   isDrawing=false
})

areaDesenho.addEventListener("mouseleave", e=>{
   isDrawing=false
})

areaDesenho.addEventListener("dragstart", e=>{
   e.preventDefault()
})

areaDesenho.addEventListener("mouseover", e=>{
   if(isDrawing && e.target.classList.contains("pixel")){
      // e.target.classList.add("painted")
      pintaPixel(e.target)
   }
})

resetButton.addEventListener("click", e=>{
   [...areaDesenho.children].forEach(item=>{
      item.classList.remove("painted")
      item.style.backgroundColor = "inherit"
   })
})

changeSizeButton.addEventListener("click", e=>{
   let numPixel = prompt("Quatos pixels em cada lado você deseja?")
   if(numPixel>100 || numPixel<0){
      alert("Numero do pixels não pode ser maior que 100 em cada lado (100x100)")
      return 
   }
   squareSize = numPixel
   criarQuadro(squareSize)
})
