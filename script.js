const canvas = document.querySelector(".canvas")
const blackMarkerButton = document.getElementById("blackMarkerButton")
const RGBMarkerButton = document.getElementById("RGBMarkerButton")
const promptInputSquaresButton = document.getElementById("promptInputSquaresButton")
const resetCanvasButton = document.getElementById("resetCanvasButton")


const makeCanvas = (num) => {
    canvas.style.setProperty('--grid-rows', num);
    canvas.style.setProperty('--grid-cols', num);
    canvas.innerHTML = '';
    blackMarkerButton.classList.add("hidden")
    RGBMarkerButton.classList.remove("hidden")


    const blackMarker = (square) => {
        square.style.backgroundColor = "#000000"
        let currentOpacity = parseFloat(square.style.opacity);
        if (currentOpacity > 0) {
            square.style.opacity = currentOpacity - 0.1;
        }
    } 
    
    const RGBMarker = (square) => {
        square.style.backgroundColor = `${randomColor()}`
    }

    let currentMarker = blackMarker

    blackMarkerButton.addEventListener("click", () => {
        blackMarkerButton.classList.add("hidden")
        RGBMarkerButton.classList.remove("hidden")
        currentMarker = blackMarker
    })

    RGBMarkerButton.addEventListener("click", () => {
        RGBMarkerButton.classList.add("hidden")
        blackMarkerButton.classList.remove("hidden")
        currentMarker = RGBMarker
    })

    for(let i = 0; i < (num * num); i++) {
        const square = document.createElement("div")
        square.className = "square";
        square.style.opacity = 1

        square.addEventListener("mouseenter", () => {
            currentMarker(square)
        })

        canvas.appendChild(square)
    }
}

makeCanvas(64)

const randomColor = () => {
    let hexColor = "0123456789ABCDEF"
    let color = "#"
    for(i = 1; i <= 6; i++) {
        color += hexColor[Math.floor(Math.random() * 16)]
    }
    return color
}

const promptForNumber = () => {
    let num
    num = prompt("Enter the size of your canvas squares (minimum 2 and maximum 100 squares)")
    if(isNaN(num) || num > 100 || num < 2) {
        alert("Wrong Input")
    } else {
        makeCanvas(num)
    }
}

promptInputSquaresButton.addEventListener("click", () => {
    promptForNumber()
})

resetCanvasButton.addEventListener("click", () => {
    let canvasSquares = document.querySelectorAll(".square") 
    canvasSquares.forEach((square) => square.style.backgroundColor = "#c0c0c0")
})
