import '../css/main.css';

const Line = require(`./Tools/Line`).Line;
const MenuElements = require(`./DOMElements.js`).MenuElements;
const CanvasContainerElements = require(`./DOMElements.js`).CanvasContainerElements;
const ToolFabric = require(`./ToolFabric.js`).ToolFabric;
const CanvasStateManager = require(`./CanvasStateManager.js`).CanvasStateManager;
const CanvasUI = require(`./CanvasUI.js`).CanvasUI;
const MenuUI = require(`./MenuUI`).MenuUI;

window.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    // przekazanie stateManagera do toolFabric by je przekazac tworzonym narzedzia

    const cavansStateManager = new CanvasStateManager();
    const initialTool = new Line(cavansStateManager);
    const toolFabric = new ToolFabric(initialTool,cavansStateManager);
    const canvasUI = new CanvasUI(cavansStateManager,initialTool);
    const menuUI = new MenuUI(toolFabric, canvasUI);

    setCanvasInitialProperties();
    setInitialPropertiesValue();
    cavansStateManager.addState();

}

const setCanvasInitialProperties = () => {
    setCanvasSize(CanvasContainerElements.canvas);
    clearCanvas(CanvasContainerElements.canvas);
}

const setCanvasSize = (canvas) => {
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
}

const clearCanvas = (canvas) => {
    const context = canvas.getContext(`2d`);

    context.fillStyle = `rgba(255,255,255,1)`;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

const setInitialPropertiesValue = () => {
    const canvas = CanvasContainerElements.canvas;

    MenuElements.canvasWidthInput.value = canvas.clientWidth;
    MenuElements.canvasHeightInput.value = canvas.clientHeight;
    MenuElements.canvasLineWidthInput.value = `5`;
    MenuElements.canvasFontSizeInput.value = `20`;
}


// zrobic load pdf -- zrobic input na nazwe pliku do zapisu
