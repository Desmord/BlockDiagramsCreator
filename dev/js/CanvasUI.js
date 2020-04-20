const CanvasElement = require(`./DOMElements.js`).CanvasContainerElements;

class CanvasUI {
    constructor() {
        this.tool = null;
        this.init();
    }

    init() {
        console.log(`inicjuje canas UI`);
    }

    setTool(tool) {
        this.tool = tool;
        // console.log(tool);
    }

    updateCanvasWidth(newWidth) {
        console.log(`odswierzam szerokosc ${newWidth}`);
    }

    updateCanvasHeight(newHeight) {
        console.log(`odświerzam wysokosc ${newHeight}`);
    }

}

module.exports = {
    CanvasUI
}