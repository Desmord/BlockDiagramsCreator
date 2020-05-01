const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;

class Line {

    constructor(cavansStateManager) {
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.cavansStateManager = cavansStateManager;
        this.name = `line`;
        this.color = `rgba(0,0,0,1)`;
        this.lineWidth = `5`;
        this.isDrawing = false;
        this.startPoint = {
            x: 0,
            y: 0
        }
    }

    onMouseDown(e) {

        this.startPoint.x = this.getMouseHorizontalPosition(e);
        this.startPoint.y = this.getMouseVerticalPosition(e);
        this.isDrawing = true;

    }
    onMouseMove(e) {
        if (this.isDrawing) {
            this.clearCanvas();
            this.restoreState();
            this.drawLine(e)
        }
    }
    onMouseUp(e) {
        this.isDrawing = false;
        this.drawLine(e);
        this.cavansStateManager.addState();
    }

    drawLine(e) {
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.lineWidth;

        this.context.beginPath();
        this.context.moveTo(this.startPoint.x,this.startPoint.y);
        this.context.lineTo(this.getMouseHorizontalPosition(e),this.getMouseVerticalPosition(e));
        this.context.stroke();
    }

    clearCanvas() {
        let color = this.color;
        this.context.fillStyle = `rgb(255,255,255)`;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = color;
    }

    restoreState() {
        this.context.drawImage(this.cavansStateManager.getLastState(), 0, 0)
    }

    getMouseHorizontalPosition(e) {
        return e.clientX + this.canvas.parentElement.scrollLeft - this.getCanvasLeftMargin(e)
    }

    getCanvasLeftMargin(e) {
        let padding = 30;
        return e.target.parentElement.offsetLeft +
            e.target.parentElement.parentElement.offsetLeft + padding
    }

    getMouseVerticalPosition(e) {
        return e.clientY + this.canvas.parentElement.scrollTop - this.getCanvasTopMargin(e)
    }

    getCanvasTopMargin(e) {
        return e.target.parentElement.offsetTop +
            e.target.parentElement.parentElement.offsetTop
    }

    updateColor(newColor) {
        this.color = newColor;

    }
    updateLineWidth(newLineWidth) {
        this.lineWidth = newLineWidth
    }

    updateFontSize() { }

}

module.exports = {
    Line
}