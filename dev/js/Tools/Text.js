// tutaj w teskie sciagnac text area tez zeby moc pisac tekst

class Text {
    constructor() {
        this.name = `text`
    }

    onMouseDown() { }
    onMouseMove() { }
    onMouseUp() { }

    stopDrawing(){}
    updateColor(newColor) {
        console.log(`${this.name} color - ${newColor}`);
    }
    updateFontSize(newFontSize) {
        console.log(`odswierzam font size ${newFontSize}`);
     }
    updateLineWidth() { }
}


module.exports = {
    Text
}