const CanvasElements = require(`./DOMElements.js`).CanvasContainerElements;

class CanvasUI {
    constructor(canvasStateManager) {
        this.tool = null;
        this.canvasStateManager = canvasStateManager;
        this.init();
    }

    init() {
        this.setCanvasMouseHoverEvent();
        this.setResetButtonClickEvent();
        this.setScrollXEvent();
    }

    setTool(tool) {
        this.tool = tool;
    }

    updateCanvasWidth(newWidth) {
        this.canvasStateManager.addState();

        CanvasElements.canvas.style.width = `${newWidth}px`;
        CanvasElements.canvas.width = `${newWidth}`;

        this.canvasStateManager.getLastState().addEventListener(`load`, () => {
            CanvasElements.canvas.getContext(`2d`).drawImage(this.canvasStateManager.getLastState(), 0, 0);
        })

    }

    updateCanvasHeight(newHeight) {
        this.canvasStateManager.addState();

        CanvasElements.canvas.style.height = `${newHeight}px`;
        CanvasElements.canvas.height = `${newHeight}`;

        this.canvasStateManager.getLastState().addEventListener(`load`, () => {
            CanvasElements.canvas.getContext(`2d`).drawImage(this.canvasStateManager.getLastState(), 0, 0);
        })

    }

    setCanvasMouseHoverEvent() {
        CanvasElements.canvas.addEventListener(`mousemove`, (e) => {
            let left =
                e.clientX +
                CanvasElements.canvas.parentElement.scrollLeft -
                // substract all marigins and paddings
                CanvasElements.canvas.offsetLeft -
                CanvasElements.canvas.parentElement.offsetLeft -
                CanvasElements.canvas.parentElement.parentElement.offsetLeft;
            let top =
                e.clientY +
                CanvasElements.canvas.parentElement.scrollTop -
                // substract all marigins and paddings
                CanvasElements.canvas.offsetTop -
                CanvasElements.canvas.parentElement.offsetTop -
                CanvasElements.canvas.parentElement.parentElement.offsetTop;

            CanvasElements.mouseCoordinatesLabel.innerHTML = `${left}x / ${top}y`;
        })
    }

    setResetButtonClickEvent() {
        CanvasElements.resetButton.addEventListener(`click`, () => {
            const context = CanvasElements.canvas.getContext(`2d`);

            context.fillStyle = `rgb(255,255,255)`;
            context.fillRect(0, 0, CanvasElements.canvas.width, CanvasElements.canvas.height);
        })
    }

    setScrollXEvent(){

    }

    // on clikc
    //on move
    // on up

}

module.exports = {
    CanvasUI
}