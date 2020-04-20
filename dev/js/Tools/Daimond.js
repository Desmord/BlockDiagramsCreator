class Daimond {
    constructor() {
        this.name = `diamond`
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
    Daimond
}