class UIHandler {
    constructor() {
        this.elements = [];

        this.buttons = [];

        this.maxElements = 20;
    }

    updateButtons(x, y) {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].check(x, y)) {
                let a = new UIAlert("Button Clicked", "You clicked the button!");
                ui.addElement(a);
            }
        }
    }

    addElement(uiElement) {

        if (this.elements.length > this.maxElements) { 
            this.elements.splice(this.elements.length-1, 1);
        }

        this.elements.push(uiElement);
    }

    getInventory() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == "controls") {
                return this.elements[i];
            }
        }
    }

    display() {
        for (let i = (this.elements.length-1); i > 0; i--) {
            if (this.elements[i].lifespan != undefined) {
                this.elements[i].lifespan--;
                if (this.elements[i].lifespan < 0) {
                    this.elements.splice(i, 1);
                    // return;
                } 
            }
        }

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].display();
        }

        
    }
}