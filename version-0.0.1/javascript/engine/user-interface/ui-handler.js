class UIHandler {
    constructor() {
        this.elements = [];
    }

    addElement(uiElement) {
        this.elements.push(uiElement);
    }

    display() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].lifespan--;
            if (this.elements[i].lifespan < 0) {
                this.elements.splice(i, 1);
                return;
            } 

            this.elements[i].display();
        }
    }
}