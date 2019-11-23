class UIHandler {
    constructor() {
        this.elements = [];
    }

    addElement(uiElement) {

        if (this.elements.length > 5) {
            this.elements.splice(this.elements.length-1, 1);
        }

        this.elements.push(uiElement);
    }

    display() {
        for (let i = (this.elements.length-1); i > 0; i--) {
            this.elements[i].lifespan--;
            if (this.elements[i].lifespan < 0) {
                this.elements.splice(i, 1);
                return;
            } 

            this.elements[i].display();
        }
    }
}