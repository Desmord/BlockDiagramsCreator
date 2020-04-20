class CanvasUI{
    constructor(){
        this.tool = null;
        this.init();
    }

    init(){
        console.log(`inicjuje canas UI`);
    }

    setTool(tool){
        this.tool = tool;
        // console.log(tool);
    }
}

module.exports = {
    CanvasUI
}