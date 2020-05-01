const jsPDF = require(`jspdf`);
const MenuElements = require(`./DOMElements.js`).MenuElements;
const CanvasElements = require(`./DOMElements.js`).CanvasContainerElements;

class MenuUI {
    constructor(toolFabric, canvasUI) {
        this.canvasUI = canvasUI;
        this.toolFabric = toolFabric;
        this.init();
    }

    init() {
        this.setToolsButtonClickEvent();
        this.setPropertiesEvents();
        this.setTextEraserEvent();
        this.setColorsClickEvent();
        this.setSaveEvent();
        this.setLoadEvent();
    }

    setToolsButtonClickEvent() {

        MenuElements.allToolsButton.forEach(button => {

            button.addEventListener(`click`, () => {
                const isTextClicked = button.getAttribute(`data-tool`) == `text` ? true : false;
                isTextClicked ? this.showTextContainer() : this.showColorPalette();

                this.canvasUI.setTool(
                    this.toolFabric.getTool(
                        button.getAttribute(`data-tool`))
                );
                this.setNewActiveButton(button);
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
            const properttieInput = properttie.children[0]
            const properttieSubbmitButton = properttie.children[2];

            // keyup -> filter value
            properttieInput.addEventListener(`keyup`, e => {
                e.target.value = this.filtrNumbers(e.target.value);
            })

            // enter
            properttieInput.addEventListener(`keydown`, e=>{
                if(e.key == `Enter`){
                    this.propertiesSubbmit(properttie);
                }
            })

            // click
            properttieSubbmitButton.addEventListener(`click`, e => {
                this.propertiesSubbmit(properttie);
            })
        })

    }

    propertiesSubbmit(properttie) {
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

    setTextEraserEvent() {
        MenuElements.textEraserButton.addEventListener(`click`, () => {
            MenuElements.textArea.value = ``;
        })
    }

    setColorsClickEvent() {

        MenuElements.paletteColors.forEach(colorCell => {
            colorCell.addEventListener(`click`, e => {
                const selectedColor = window.getComputedStyle(e.target, null).getPropertyValue(`background-color`);

                this.toolFabric.updateColor(selectedColor);
                this.setNewActiveColor(colorCell);
            })
        })
    }

    setNewActiveColor(newActiveColorCell) {
        MenuElements.paletteColors.forEach(colorCell => {
            colorCell.classList.remove(`menu__color--active`);
        })
        newActiveColorCell.classList.add(`menu__color--active`);
    }


    setSaveEvent() {

        MenuElements.saveButton.addEventListener(`click`, () => {
            const canvas = CanvasElements.canvas;
            let width = canvas.width;
            let height = canvas.height;
            let pdf = null;

            if (width > height) {
                pdf = new jsPDF(`l`, `px`, [width, height]);
            } else {
                pdf = new jsPDF(`p`, `px`, [height, width]);
            }

            width = pdf.internal.pageSize.getWidth();
            height = pdf.internal.pageSize.getHeight();

            let img = canvas.toDataURL(`image/jpeg`, 1.0);
            pdf.addImage(img, `JPEG`, 0, 0, width, height);
            pdf.save(`Schematy.pdf`)
        })

    }

    setLoadEvent() {
        MenuElements.loadButton.addEventListener(`click`, () => {
            console.log(`Wczytujemy`);
        })
    }

}

module.exports = {
    MenuUI
}
