const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;

class Line {
    constructor() {
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.canvasDrawInitialState = null;
        this.canvasDrawPreviousStates = [];
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.name = `line`;
        this.color = `rgba(0,0,0,1)`;
        this.lineWidth = `5`;
        this.isDrawing = false;
        this.startPoint = {
            x: 0,
            y: 0
        },
        this.endPoint = {
            x: 0,
            y: 0
        }
    }

    onMouseDown() {
        console.log(`rysujemy linie`);
     }
    onMouseMove() {
        // if is drawing
        console.log(`przesuwamy linie`);
    }
    onMouseUp() {
        console.log(`konczymy linie`);
     }
    updateColor(newColor) {
        console.log(`${this.name} color - ${newColor}`);

    }
    updateFontSize() { }
    updateLineWidth(newLineWidth) {
        console.log(`${this.name} odswierzam szerokosc lini ${newLineWidth}`);
     }
    //
    // setState - getState -> te do zapisu
}

module.exports = {
    Line
}