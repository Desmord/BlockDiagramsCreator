const CanvasElements = require(`./DOMElements.js`).CanvasContainerElements;

class CanvasUI {
    constructor(canvasStateManager) {
        this.tool = null;
        this.canvasStateManager = canvasStateManager;
        this.scrollingX = false;
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

    setScrollXEvent() {

        CanvasElements.scrollX.container.addEventListener(`mousedown`, (e) => {
            this.scrollingX = true;
        })

        CanvasElements.scrollX.container.addEventListener(`mousemove`, (e) => {

            if (this.scrollingX) {
                let scroll = e.clientX - e.target.parentElement.offsetLeft -
                    (CanvasElements.scrollX.slider.clientWidth / 2);

                if (this.isNotScrollXOutOfCanvas(scroll)) {
                    let padding = 37;
                    let scrollPercent = parseInt(((scroll / CanvasElements.scrollX.sliderLine.clientWidth) * 100));
                    let availableScrollLength = padding + CanvasElements.canvas.clientWidth - CanvasElements.canvasContainer.clientWidth;
                    let scrollCanvasAmount = parseInt((scrollPercent / 100) * availableScrollLength)

                    CanvasElements.scrollX.slider.style.left = `${scroll}px`;
                    CanvasElements.canvasScrollContainer.scrollLeft = `${scrollCanvasAmount}`;
                    CanvasElements.scrollX.label.innerHTML = `${scrollCanvasAmount}px`;
                }

            }
        })

        CanvasElements.scrollX.container.addEventListener(`mouseup`, (e) => {
            this.scrollingX = false;
        })

        CanvasElements.scrollX.container.addEventListener(`mouseleave`, (e) => {
            this.scrollingX = false;
        })
    }

    isNotScrollXOutOfCanvas(scroll){
        if (scroll < CanvasElements.scrollX.sliderLine.offsetLeft ||
            scroll > CanvasElements.scrollX.sliderLine.clientWidth +
            CanvasElements.scrollX.sliderLine.offsetLeft -
            CanvasElements.scrollX.slider.clientWidth
        ){
            return false;
        }else{
            return true;
        }
    }

    // tools
    // on clikc
    //on move
    // on up

}

module.exports = {
    CanvasUI
}