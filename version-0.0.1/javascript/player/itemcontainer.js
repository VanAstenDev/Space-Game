class ItemContainer {
    constructor() {
        this.items = [];
    }

    getItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                return this.items[i];
            }
        }
    }

    addItem(item) {
        //check for dupe
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id == item.id) {
                return;
            }
        }

        this.items.push(item);
    }

    createItem(id, name) {
        let i = new Item(id, name);
        this.addItem(i);
    }
}