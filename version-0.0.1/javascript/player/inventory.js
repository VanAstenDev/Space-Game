class Inventory {
    constructor() {
        this.itemStacks = [];
        this.maxStackSize = 100;

        // for (let i = 0; i < 10; i++) {
        //     let emptyItem = new Item("empty_item_"+i, "Empty Slot "+i);
        //     let itemstack = new ItemStack(emptyItem, 1);
        //     this.itemStacks.push(itemstack);
        // }
    }

    addItemStack(itemStack) {
        //check if dupe
        for (let i = 0; i < this.itemStacks.length; i++) {
            if (this.itemStacks[i].item.id == itemStack.item.id) {
                //check if stack isnt full
                if (this.itemStacks[i].amount < this.maxStackSize) {
                    //add amount
                    this.itemStacks[i].amount += itemStack.amount;
                    return;
                }
            }
        }

        if (this.itemStacks.length < 10) {
            this.itemStacks.push(itemStack);
        }
    }

    removeFromItemStack(id, amount) {
        //find item
        for (let i = this.itemStacks.length-1; i >= 0; i--) {
            if (this.itemStacks[i].item.id == id) {
                //check if enough amount
                if (this.itemStacks[i].amount >= amount) {
                    //take amount off
                    this.itemStacks[i].amount -= amount;
                    if (this.itemStacks[i].amount <= 0) {
                        this.itemStacks.splice(i, 1);
                    }
                }
            }
        }
    }

    checkForItems(id, amount) {
        //find item
        for (let i = this.itemStacks.length; i>= 0; i--) {
            if (this.itemStacks[i].item.id == id) {
                //check if enough amount
                if (this.itemStacks[i].amount >= amount) {
                    return true;
                }
            }
        }

        return false;
    }

    getInput() {
        let nums = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        for (let i = 0; i < this.itemStacks.length; i++) {
            if (keyIsDown(nums[i])) {
                this.itemStacks[i].use()
            }
        }
    }

    useItemStack(id) {
        //find item
        for (let i = this.itemStacks.length - 1; i >= 0; i--) {
            if (this.itemStacks[i].item.id == id) {
                //check if enough items
                if (this.itemStacks[i].amount >= 1) {
                    //check for use function
                    if (this.itemStacks[i].item.use) {
                        //use item and take amount
                        this.itemStacks[i].item.use();
                        this.itemStacks[i].amount--;

                        if (this.itemStacks[i].amount <= 0) {
                            this.itemStacks.splice(i, 1);
                        }

                        return;
                    }
                }
            }
        }
    }
}