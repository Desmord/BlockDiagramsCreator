const MenuElements = require(`./DOMElements.js`).MenuElements;

class MenuUI {
    constructor(toolFabric, canvasUI) {
        this.canvasUI = canvasUI;
        this.toolFabric = toolFabric;
        this.init();
    }

    init() {
        this.setToolsButtonClickEvent();
    }

    setToolsButtonClickEvent() {

        MenuElements.allToolsButton.forEach(button => {

            button.addEventListener(`click`, () => {
                const isTextClicked = button.getAttribute(`data-tool`) == `text` ? true : false;

                this.canvasUI.setTool(
                    this.toolFabric.getTool(
                        button.getAttribute(`data-tool`))
                );
                this.setNewActiveButton(button);
                isTextClicked ? this.showTextContainer() : this.showColorPalette();

            })

        })

    }

    setNewActiveButton(clickedButton) {
        MenuElements.allToolsButton.forEach(button => {
            button.children[0].classList.remove(`button__background--active`);
        })
        clickedButton.children[0].classList.add(`button__background--active`);
    }

    showTextContainer() {
        console.log(`pokazuje tekx container`);
    }

    showColorPalette() {
        console.log(`pokazuje colory`);
    }

}

module.exports = {
    MenuUI
}