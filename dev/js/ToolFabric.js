const Line = require(`./Tools/Line.js`).Line;
const Arrow = require(`./Tools/Arrow.js`).Arrow;
const Text = require(`./Tools/Text.js`).Text;
const Eraser = require(`./Tools/Eraser`).Eraser;
const Daimond = require(`./Tools/Daimond.js`).Daimond;
const Square = require(`./Tools/Square`).Square;

class ToolFabric {
    constructor(initialTool,cavansStateManager) {
        this.line = initialTool;
        this.arrow = new Arrow(cavansStateManager);
        this.text = new Text(cavansStateManager);
        this.eraser = new Eraser(cavansStateManager);
        this.daimond = new Daimond(cavansStateManager);
        this.square = new Square(cavansStateManager);
    }

    getAllTools() {
        return new Array(
            this.line,
            this.arrow,
            this.text,
            this.eraser,
            this.daimond,
            this.square)
    }

    getTool(tool) {
        switch (tool) {
            case `square`:
                return this.square;
            case `daimond`:
                return this.daimond;
            case `text`:
                return this.text;
            case `line`:
                return this.line;
            case `arrow`:
                return this.arrow;
            case `eraser`:
                return this.eraser;
            default:
                return this.line;
        }
    }

    updateColor(newColor) {
        this.getAllTools().forEach(tool => tool.updateColor(newColor));
    }

    updateFontSize(newFontSize) {
        this.getAllTools().forEach(tool => tool.updateFontSize(newFontSize));
    }

    updateLineWidth(newLineWidth) {
        this.getAllTools().forEach(tool => tool.updateLineWidth(newLineWidth));
    }
}

module.exports = {
    ToolFabric
}