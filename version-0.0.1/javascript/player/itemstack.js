class ItemStack {
    constructor(item, amount) {
        this.item = item;
        this.amount = amount;

        this.cd = 50;
        this.timer = 0;
    }

    update() {
        this.timer++;
    }

    use() {
        if (this.timer >= this.cd) {
            if (this.item.useable) {
                player.inventory.removeFromItemStack(this.item.id, 1);
                this.item.use();
                this.timer = 0;
            } else {
                this.item.use();
                this.timer = 0;
            }
        }
    }
}