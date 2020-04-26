const CanvasElements = require(`./DOMElements.js`).CanvasContainerElements;

class CanvasStateManager {
    constructor() {
        this.states = [];
    }

    addState() {
        let image = document.createElement(`img`);
        image.src = CanvasElements.canvas.toDataURL(`image/png`);
        this.states.push(image);
    }
 // spraawdzanie czy istnieje
 // czy wiecje niz 100 itd

    getLastState() {
        return [...this.states].pop();
    }

    getFirstState(){
        return this.states[0]
    }

    getAllStates() {
        return this.states;
    }

}


module.exports = {
    CanvasStateManager
}
