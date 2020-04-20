export const MenuElements = {
    allToolsButton: document.querySelectorAll(`.button`),
    lineButton: document.querySelector(`.button[data-tool=line]`),
    arrowButton: document.querySelector(`.button[data-tool=arrow]`),
    squareButton: document.querySelector(`.button[data-tool=square]`),
    diamondButton: document.querySelector(`.button[data-tool=daimond]`),
    eraserButton: document.querySelector(`.button[data-tool=eraser]`),
    textButton: document.querySelector(`.button[data-tool=text]`),
    textColorPaletteContainer: document.querySelector(`.menu__text-color-container`),
    colorPalette: document.querySelector(`.menu__color-palette`),
    paletteColors: document.querySelectorAll(`.menu__color`),
    textAreaContainer: document.querySelector(`.menu__text-container`),
    textArea: document.querySelector(`#text`),
    textEraserButton: document.querySelector(`.menu__text-clear`),
    allPropertties: document.querySelectorAll(`.propertie`),
    properttiesSubbmitButtons: document.querySelectorAll(`.propertie__subbmit`),
    canvasWidthInput: document.querySelector(`.propertie[data-tool=width]`).childNodes[1],
    canvasHeightInput: document.querySelector(`.propertie[data-tool=height]`).childNodes[1],
    canvasLineWidthInput: document.querySelector(`.propertie[data-tool=line-width]`).childNodes[1],
    canvasFontSizeInput: document.querySelector(`.propertie[data-tool=font-size]`).childNodes[1],
    saveButton: document.querySelector(`.menu__save`),
    loadButton: document.querySelector(`.menu__load`)
}

export const CanvasContainerElements = {
    canvas:document.querySelector(`.canvas-container__canvas`),
    scrollX:{
        container:document.querySelector(`.scrollX-container`),
        slider:document.querySelector(`.scrollX-container__silder`),
        label:document.querySelector(`.scrollX-container__X`)
    },
    scrollY:{
        container:document.querySelector(`.scrollY-container`),
        slider:document.querySelector(`.scrollY-container__silder`),
        label:document.querySelector(`.scrollY-container__Y`)
    },
    backButton: document.querySelector(`.main-container__un-do`),
    forwardButton:document.querySelector(`.main-container__front`),
    resetButton:document.querySelector(`.main-container__reset`),
    mouseCoordinatesLabel:document.querySelector(`.main-container__coordinates`)
}
