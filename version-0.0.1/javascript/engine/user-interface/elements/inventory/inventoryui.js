class InventoryUI {
    constructor() {
        this.width = 500;
        this.height = 500;

        this.type = "inventory";

        this.active = false;

        this.selected = [];
    }

    display() {
        if (this.active) {
            player.inventory.getInput();
            push();
            translate(-cam.x + (width / 2 - this.width / 2), -cam.y + (height / 2 - this.height / 2));
            let ox = -cam.x + (width / 2 - this.width / 2);
            let oy = -cam.y + (height / 2 - this.height / 2);

            fill(50);
            rect(0, 0, this.width, 50);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize(32);
            text("Inventory", 0, 0, this.width, 50);

            fill(150);
            rect(0, 50, this.width, 100);
            fill(30);
            textAlign(CENTER, CENTER);
            textSize(30);
            text("Press any number to use that item (if item is usable).", 0, 50, this.width, 100);

            fill(80);
            rect(0, 150, this.width, this.height);

            let textY = 130;
            // let buttonY = 90;
            fill(255);
            for (let i = 0; i < player.inventory.itemStacks.length; i++) {
                fill(255);
                noStroke();
                textSize(30);
                textAlign(CENTER);
                text("["+i+"] "+player.inventory.itemStacks[i].item.name+" | "+player.inventory.itemStacks[i].amount, 0, textY, this.width, textY+20);

                //every list element should have a small (use) button
                //create button here (with listener that references itemstack use() function is that exists)
                // fill(0, 255, 0);
                // rect(30, buttonY, 70, 20);
                // fill(0);
                // textSize(24);
                // text("USE", 30, textY, 70, textY+20);

                //NUMBERS TO USE!!!

                textY+=20;
                // buttonY+=30;
            }

            pop();
        }
    }
}