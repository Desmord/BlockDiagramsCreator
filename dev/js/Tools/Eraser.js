const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;

class Eraser {
    constructor(cavansStateManager) {
        this.name = `eraser`
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.cavansStateManager = cavansStateManager;
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
        // this.clearCanvas();
        // this.restoreState();
    }

    onMouseMove(e) {
        this.startPoint.x = this.getMouseHorizontalPosition(e);
        this.startPoint.y = this.getMouseVerticalPosition(e);

        if (this.isDrawing) {
            this.erase(e)
        } else {
            this.clearCanvas();
            this.restoreState();
            this.drawEraserBorders(e);

        }
        this.cavansStateManager.addState();

    }

    onMouseUp(e) {
        this.isDrawing = false;
    }


    erase(e) {
        window.requestAnimationFrame(() => {
            this.context.fillStyle = `rgb(255,255,255)`;
            this.context.fillRect(
                this.startPoint.x - (this.lineWidth * 3) - this.lineWidth,
                this.startPoint.y - (this.lineWidth * 3) - this.lineWidth,
                parseInt(this.lineWidth * 6) + parseInt(this.lineWidth * 1.2),
                parseInt(this.lineWidth * 6) + parseInt(this.lineWidth * 1.2)
            );
        })
    }

    /**
     * Size of the square border depends on lineWidth
     * @param {event} e
     */
    drawEraserBorders(e) {
        window.requestAnimationFrame(() => {
            this.context.strokeStyle = `rgb(90,90,90)`;
            this.context.lineWidth = 2;

            // left
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (this.lineWidth * 3), this.startPoint.y + (this.lineWidth * 3));
            this.context.lineTo(this.startPoint.x - (this.lineWidth * 3), this.getMouseVerticalPosition(e) - (this.lineWidth * 3));
            this.context.stroke();
            //top
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (this.lineWidth * 3), this.startPoint.y - (this.lineWidth * 3));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (this.lineWidth * 3), this.startPoint.y - (this.lineWidth * 3));
            this.context.stroke();
            // right
            this.context.beginPath();
            this.context.moveTo(this.getMouseHorizontalPosition(e) + (this.lineWidth * 3), this.startPoint.y + (this.lineWidth * 3));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (this.lineWidth * 3), this.getMouseVerticalPosition(e) - (this.lineWidth * 3));
            this.context.stroke();
            // bottom
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (this.lineWidth * 3), this.getMouseVerticalPosition(e) + (this.lineWidth * 3));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (this.lineWidth * 3), this.getMouseVerticalPosition(e) + (this.lineWidth * 3));
            this.context.stroke();

        })
    }

    stopDrawing() {
        this.isDrawing = false;
        this.restoreState();
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
    Eraser
}