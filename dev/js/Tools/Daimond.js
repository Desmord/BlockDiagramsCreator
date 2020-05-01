class Daimond {
    constructor() {
        this.name = `diamond`
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
    Daimond
}