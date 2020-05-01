class Square {
    constructor() {
        this.name = `square`
    }

    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }
    stopDrawing(){}

    updateColor(newColor) {
        console.log(`${this.name} color - ${newColor}`);

    }
    updateFontSize() { }
    updateLineWidth(newLineWidth) {
        console.log(`${this.name} odswierzam szerokosc lini ${newLineWidth}`);
     }
}

module.exports = {
   Square
}