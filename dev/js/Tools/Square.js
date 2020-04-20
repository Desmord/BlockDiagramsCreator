class Square {
    constructor() {
        this.name = `square`
    }

    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }
    updateColor(newColor) { }
    updateFontSize() { }
    updateLineWidth(newLineWidth) {
        console.log(`${this.name} odswierzam szerokosc lini ${newLineWidth}`);
     }
}

module.exports = {
   Square
}