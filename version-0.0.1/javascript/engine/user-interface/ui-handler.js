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
            this.elements.splice(this.elements.length - 1, 1);
        }

        this.elements.push(uiElement);
    }

    getControls() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == "controls") {
                return this.elements[i];
            }
        }
    }

    getInventory() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == "inventory") {
                return this.elements[i];
            }
        }
    }

    getShipinfo() {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].type == "shipinformation") {
                return this.elements[i];
            }
        }
    }

    display() {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i].type == "radar") {
                this.elements[i].display();
                this.elements[i].upgrade();
            }
        }

        for (let i = this.elements.length - 1; i >= 0; i--) {
            // if (this.elements[i].type != "banner") {
            //add other elements to leftovers
            if (this.elements[i].type != "radar") {
                this.elements[i].display();
                if (this.elements[i].update != undefined) {
                    this.elements[i].update();
                }
                if (this.elements[i].lifespan != undefined) {
                    this.elements[i].lifespan--;
                    if (this.elements[i].lifespan < 0 || this.elements[i].die) {
                        this.elements.splice(i, 1);
                    }
                }
            }

            // }
        }
    }
}