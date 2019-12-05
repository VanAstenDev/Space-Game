class Item {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    addUse(func) {
        this.use = func;
    }

    use() {
        let a = new UIAlert("Error", "Item isn't usable!");
        ui.addElement(a);
        return false;
    }
}