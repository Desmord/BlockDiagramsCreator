const CanvasElements = require(`./DOMElements.js`).CanvasContainerElements;

class CanvasStateManager {
    constructor() {
        this.states = [];
        this.currentStateIndex = 0;
    }

    addState() {
        let image = document.createElement(`img`);
        image.src = CanvasElements.canvas.toDataURL(`image/png`);

        if (this.states.length > 100) {
            this.states.splice(0, 1);
            this.states.push(image);
        } else {
            this.states.push(image);
        }

        if (this.currentStateIndex < this.states.length - 3) {
            this.states.splice(this.currentStateIndex, this.states.length - this.currentStateIndex)
        }
        this.setStateIndex(this.states.length - 1);

    }

    getLastState() {
        return [...this.states].pop();
    }

    getFirstState() {
        return this.states[0]
    }

    getAllStates() {
        return this.states;
    }

    getCurrentStateIndex() {
        return this.currentStateIndex;
    }

    getState(stateIndex) {
        return this.states[stateIndex];
    }

    setStateIndex(newIndex) {
        this.currentStateIndex = newIndex
    }

    increaseStateIndex() {
        if (this.currentStateIndex < 100 &&
            this.currentStateIndex + 1 < this.states.length) {
            this.currentStateIndex++
        }
    }

    decreaseStateIndex() {
        if (this.currentStateIndex > 0) {
            this.currentStateIndex--
        }
    }

}


module.exports = {
    CanvasStateManager
}
