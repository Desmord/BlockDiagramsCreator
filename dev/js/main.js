import '../css/main.css';

const MenuElements = require(`./DOMElements.js`).MenuElements;
const CanvasContainerElements = require(`./DOMElements.js`).CanvasContainerElements;
const ToolFabric = require(`./ToolFabric.js`).ToolFabric;
const CanvasUI = require(`./CanvasUI.js`).CanvasUI;
const MenuUI = require(`./MenuUI`).MenuUI;

window.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    const toolFabric = new ToolFabric();
    const canvasUI = new CanvasUI();
    const menuUI = new MenuUI(toolFabric,canvasUI);

    setCanvasInitialProperties();
    setInitialPropertiesValue();


}

const setCanvasInitialProperties = () => {
    const canvas = CanvasContainerElements.canvas;

    setCanvasSize(canvas);
    clearCanvas(canvas);
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

const setInitialPropertiesValue = ()=>{
    const canvas = CanvasContainerElements.canvas;

    MenuElements.canvasWidthInput.value = canvas.clientWidth;
    MenuElements.canvasHeightInput.value = canvas.clientHeight;
    MenuElements.canvasLineWidthInput.value = `5`;
    MenuElements.canvasFontSizeInput.value = `20`;
}


// NArysowaca jakis probny obrazek do tesow przesuniec resize i   innych




//W CanvasUI resize update wielkosci canvasu i zapis i wczytanie stanu zeby przy zmianie nie resetował
     //  ustawienie rozmiaru fontu i szerokosci lini w inputahc
    // update properties values