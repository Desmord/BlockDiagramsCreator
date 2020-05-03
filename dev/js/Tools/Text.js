const CanvasContainerElements = require(`../DOMElements.js`).CanvasContainerElements;
const MenuElement = require(`../DOMElements.js`).MenuElements;

// MenuElement.textArea
class Text {
    constructor(cavansStateManager) {
        this.name = `text`
        this.name = `eraser`
        this.canvas = CanvasContainerElements.canvas;
        this.context = this.canvas.getContext(`2d`);
        this.cavansStateManager = cavansStateManager;
        this.color = `rgba(0,0,0,1)`;
        this.lineWidth = `5`;
        this.fontSize = `20px`;
        this.isDrawing = true;
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
        this.startPoint.x = this.getMouseHorizontalPosition(e);
        this.startPoint.y = this.getMouseVerticalPosition(e);

        if (this.isDrawing) {
            this.clearCanvas();
            this.restoreState();
            this.drawTextBorders(e);
        }

    }

    onMouseUp(e) {
        this.isDrawing = false;
        this.clearCanvas();
        this.restoreState();
        this.drawText(e)

        setTimeout(() => {
            this.cavansStateManager.addState();
            this.isDrawing = true;
        }, 400);

    }


    drawText(e) {
        window.requestAnimationFrame(() => {
            this.context.font = ` ${this.fontSize} 'PT Sans`;
            this.context.fillStyle = this.color;
            this.context.textAlign = `center`;

            let textLines = MenuElement.textArea.value.split(`\n`);
            let textLinesLength = textLines.length
            let lineHeigth = parseInt(this.fontSize.substring(-2, 2));
            let height = textLinesLength * parseInt(this.fontSize.substring(-2, 2));


            textLines.forEach((line, index) => {
                this.context.fillText(
                    line,
                    this.startPoint.x,
                    this.startPoint.y - (height / 2) + (lineHeigth * 2) + ((index - 1) * lineHeigth)
                )
            })

        })
    }


    drawTextBorders(e) {
        window.requestAnimationFrame(() => {
            this.context.strokeStyle = this.color;
            this.context.font = `${this.fontSize} 'PT Sans'`
            this.context.lineWidth = 2;

            let fullText = MenuElement.textArea.value;
            let textLinesLength = fullText.split(`\n`);
            let textLineNumber = textLinesLength.length
            let height = textLineNumber * parseInt(this.fontSize.substring(-2, 2));
            let widthOfTheWidestLine = 0;

            textLinesLength.forEach(line => {
                if (this.context.measureText(line).width > widthOfTheWidestLine) {
                    widthOfTheWidestLine = this.context.measureText(line).width
                }
            })

            // left
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (widthOfTheWidestLine / 2), this.startPoint.y + (height / 2));
            this.context.lineTo(this.startPoint.x - (widthOfTheWidestLine / 2), this.getMouseVerticalPosition(e) - (height / 2));
            this.context.stroke();
            //top
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (widthOfTheWidestLine / 2), this.startPoint.y - (height / 2));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (widthOfTheWidestLine / 2), this.startPoint.y - (height / 2));
            this.context.stroke();
            // right
            this.context.beginPath();
            this.context.moveTo(this.getMouseHorizontalPosition(e) + (widthOfTheWidestLine / 2), this.startPoint.y + (height / 2));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (widthOfTheWidestLine / 2), this.getMouseVerticalPosition(e) - (height / 2));
            this.context.stroke();
            // bottom
            this.context.beginPath();
            this.context.moveTo(this.startPoint.x - (widthOfTheWidestLine / 2), this.getMouseVerticalPosition(e) + (height / 2));
            this.context.lineTo(this.getMouseHorizontalPosition(e) + (widthOfTheWidestLine / 2), this.getMouseVerticalPosition(e) + (height / 2));
            this.context.stroke();

        })
    }

    stopDrawing() {
        this.isDrawing = true;
        this.restoreState();
        this.cavansStateManager.addState();
    }

    startDrawing(){

    }

    clearCanvas() {
        let color = this.color;
        this.context.fillStyle = `rgb(255,255,255)`;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = color;
    }

    restoreState() {
        this.context.drawImage(this.cavansStateManager.getLastState(), 0, 0);
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

    updateFontSize(newFontSize) {
        this.fontSize = `${newFontSize}px`;
    }
    updateLineWidth(newLineWidth) {
        this.lineWidth = newLineWidth
    }
}


module.exports = {
    Text
}