const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;

class Square {
    constructor(cavansStateManager) {
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.cavansStateManager = cavansStateManager;
        this.name = `square`;
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
            this.drawSquare(e)
        }
    }

    onMouseUp(e) {
        this.isDrawing = false;
        this.drawSquare(e);
        this.cavansStateManager.addState();
    }

    drawSquare(e) {
        window.requestAnimationFrame(() => {
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.lineWidth;

            // left
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x, this.startPoint.y);
            this.context.lineTo(this.startPoint.x, this.getMouseVerticalPosition(e));
            this.context.stroke();
            //top
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x, this.startPoint.y);
            this.context.lineTo(this.getMouseHorizontalPosition(e), this.startPoint.y);
            this.context.stroke();
            // right
            this.context.beginPath();
            this.context.moveTo(this.getMouseHorizontalPosition(e), this.startPoint.y);
            this.context.lineTo(this.getMouseHorizontalPosition(e), this.getMouseVerticalPosition(e));
            this.context.stroke();
            // bottom
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x, this.getMouseVerticalPosition(e));
            this.context.lineTo(this.getMouseHorizontalPosition(e), this.getMouseVerticalPosition(e));
            this.context.stroke();
        })
    }

    stopDrawing() {
        this.isDrawing = false;
        this.cavansStateManager.addState();
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
        const padding = 30;
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
    Square
}