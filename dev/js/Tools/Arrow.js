const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;

class Arrow {
    constructor(cavansStateManager) {
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.cavansStateManager = cavansStateManager;
        this.name = `arrow`;
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
            this.drawArrow(e)
        }
    }

    onMouseUp(e) {
        this.isDrawing = false;
        this.drawArrow(e);
        this.cavansStateManager.addState();
    }

    drawArrow(e) {
        window.requestAnimationFrame(() => {
            let distance = Math.sqrt(Math.pow(this.getMouseHorizontalPosition(e) - this.startPoint.x, 2) +
                Math.pow(this.getMouseVerticalPosition(e) - this.startPoint.y, 2)),
                angle = parseInt(((Math.atan2(this.getMouseVerticalPosition(e) - this.startPoint.y,
                    this.getMouseHorizontalPosition(e) - this.startPoint.x) *
                    (180 / Math.PI)) + 360) % 360);

            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.lineWidth;
            this.context.save();

            if (this.startPoint.x > this.getMouseHorizontalPosition(e)) {
                if (this.startPoint.y > this.getMouseVerticalPosition(e)) {
                    this.context.translate(Math.abs((
                        Math.abs(this.getMouseHorizontalPosition(e) - this.startPoint.x) / 2) - this.startPoint.x),
                        Math.abs((Math.abs(this.getMouseVerticalPosition(e) - this.startPoint.y) / 2) - this.startPoint.y));
                } else {
                    this.context.translate(Math.abs((
                        Math.abs(this.getMouseHorizontalPosition(e) - this.startPoint.x) / 2) - this.startPoint.x),
                        (Math.abs(this.getMouseVerticalPosition(e) - this.startPoint.y) / 2) + this.startPoint.y);
                }
            } else {
                if (this.startPoint.y > this.getMouseVerticalPosition(e)) {
                    this.context.translate((
                        Math.abs(this.getMouseHorizontalPosition(e) - this.startPoint.x) / 2) + this.startPoint.x,
                        Math.abs((Math.abs(this.getMouseVerticalPosition(e) - this.startPoint.y) / 2) - this.startPoint.y));

                } else {
                    this.context.translate((
                        Math.abs(this.getMouseHorizontalPosition(e) - this.startPoint.x) / 2) + this.startPoint.x,
                        (Math.abs(this.getMouseVerticalPosition(e) - this.startPoint.y) / 2) + this.startPoint.y);
                }
            }

            this.context.rotate(angle * Math.PI / 180);
            // main line
            this.context.beginPath();
            this.context.moveTo(-1 * (distance / 2), 0);
            this.context.lineTo(distance / 2, 0);
            this.context.stroke();
            // right arm
            this.context.beginPath();
            this.context.moveTo((distance / 2) - distance / 10, distance / 20);
            this.context.lineTo(distance / 2, 0);
            this.context.stroke();
            // left arm
            this.context.beginPath();
            this.context.moveTo((distance / 2) - distance / 10, -1 * (distance / 20));
            this.context.lineTo(distance / 2, 0);
            this.context.stroke();

            this.context.restore();
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
    Arrow
}