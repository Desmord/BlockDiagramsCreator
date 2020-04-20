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

    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }
    updateColor(newColor) { }
    updateFontSize() { }
    updateLineWidth(newLineWidth) { }
    //
    // setState - getState -> te do zapisu
}

module.exports = {
    Line
}