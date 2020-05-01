class Arrow {
    constructor() {
        this.name= `arrow`
    }

    onMouseDown() {
        console.log(`arrow`);
     }
    onMouseMove() {
        console.log(`arrow`);

     }
    onMouseUp() {
        console.log(`arrow`);

     }
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
    Arrow
}