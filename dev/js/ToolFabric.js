const Line = require(`./Tools/Line.js`).Line;
const Arrow = require(`./Tools/Arrow.js`).Arrow;
const Text = require(`./Tools/Text.js`).Text;
const Eraser = require(`./Tools/Eraser`).Eraser;
const Daimond = require(`./Tools/Daimond.js`).Daimond;
const Square = require(`./Tools/Square`).Square;

class ToolFabric {
    constructor(initialTool) {
        this.line = initialTool;
        this.arrow = new Arrow();
        this.text = new Text();
        this.eraser = new Eraser();
        this.daimond = new Daimond();
        this.square = new Square();
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