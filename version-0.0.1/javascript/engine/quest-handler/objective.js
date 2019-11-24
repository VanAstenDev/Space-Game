class Objective {
    constructor(count) {
        this.count = count;

        this.current = 0;
        this.complete = false;
    }

    trigger() {
        this.current++;
        if (this.current >= this.count) {
            this.complete = true;
        }
    }

    check() {
        return this.complete;
    }
}