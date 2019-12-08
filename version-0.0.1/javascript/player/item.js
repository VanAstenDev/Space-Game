class Item {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.useable = 0;
    }

    addUse(func) {
        this.use = func;
        this.useable = 1;
    }

    use() {
        let a = new UIAlert("Error", "Item isn't usable!");
        ui.addElement(a);
        return false;
    }
}