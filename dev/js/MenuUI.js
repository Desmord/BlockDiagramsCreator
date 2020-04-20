const MenuElements = require(`./DOMElements.js`).MenuElements;

class MenuUI {
    constructor(toolFabric, canvasUI) {
        this.canvasUI = canvasUI;
        this.toolFabric = toolFabric;
        this.init();
    }

    init() {
        this.setToolsButtonClickEvent();
        this.setPropertiesEvents();
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
        const colorContainer = MenuElements.colorPalette;
        const textContainer = MenuElements.textAreaContainer;
        const animationTime = 200;
        const timeBetweenHideAndShow = 10;
        const blockDisplayType = `flex`;

        this.showHideColorTextContainer(
            textContainer,
            colorContainer,
            animationTime,
            timeBetweenHideAndShow,
            blockDisplayType
        );
    }

    showColorPalette() {
        const colorContainer = MenuElements.colorPalette;
        const textContainer = MenuElements.textAreaContainer;
        const animationTime = 200;
        const timeBetweenHideAndShow = 10;
        const blockDisplayType = `grid`;

        this.showHideColorTextContainer(
            colorContainer,
            textContainer,
            animationTime,
            timeBetweenHideAndShow,
            blockDisplayType
        );
    }

    showHideColorTextContainer(showElement, hideElement, animationTime, timeBetweenAnimation, display) {
        hideElement.style.opacity = `0`
        setTimeout(() => {
            hideElement.style.display = `none`;
            showElement.style.display = display;

            setTimeout(() => {
                showElement.style.opacity = `1`;
            }, timeBetweenAnimation);

        }, animationTime);

    }

    setPropertiesEvents() {

        MenuElements.allPropertties.forEach(properttie => {
            // keyup event
            properttie.children[0].addEventListener(`keyup`, e => {
                e.target.value = this.filtrNumbers(e.target.value);
            })
            // click event
            properttie.addEventListener(`click`, e => {

                const tool = properttie.getAttribute(`data-tool`);
                const input = properttie.children[0];

                switch (tool) {
                    case `width`:
                        const widthLimit = 100;

                        this.isValueToSmall(input.value, widthLimit) ? input.value = widthLimit : ``;
                        this.canvasUI.updateCanvasWidth(input.value);
                        break;
                    case `height`:
                        const heightLimit = 100;

                        this.isValueToSmall(input.value, heightLimit) ? input.value = heightLimit : ``;
                        this.canvasUI.updateCanvasHeight(input.value);
                        break;
                    case `line-width`:
                        const lineWidthLimit = 1;

                        this.isValueToSmall(input.value, lineWidthLimit) ? input.value = lineWidthLimit : ``;
                        this.toolFabric.updateLineWidth(input.value);
                        break;
                    case `font-size`:
                        const fontSizeLimit = 5;

                        this.isValueToSmall(input.value, fontSizeLimit) ? input.value = fontSizeLimit : ``;
                        this.toolFabric.updateFontSize(input.value);
                        break;
                }

            })
        })

    }

    /**
     * Checks if given value is smaller then the limit.
     * @param { number } given value
     * @param { number } limit value
     * @returns { boolean }
     */
    isValueToSmall(number, limt) {
        return number < limt ? true : false;
    }

    /**
     * Filter given text by deleting everything that is not number
     * @param { string } given text
     * @returns { string } filtered text
     */
    filtrNumbers(string) {
        return [...string].filter(character => {
            return character.match(/[0-9]/);
        }).join(``);
    }

}

module.exports = {
    MenuUI
}

// properties
// kolor -- tools fabric update color
//save load
// zdarzenie gumki text arey