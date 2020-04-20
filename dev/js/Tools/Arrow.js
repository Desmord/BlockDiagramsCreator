class Arrow {
    constructor() {
        this.name= `arrow`
    }

    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }
    updateColor(newColor) {
        console.log(`${this.name} color - ${newColor}`);

    }
    updateFontSize() { }
    updateLineWidth(newLineWidth) {
        console.log(`${this.name} odswierzam szerokosc lini ${newLineWidth}`);
     }
}


module.exports = {
    Arrow
}