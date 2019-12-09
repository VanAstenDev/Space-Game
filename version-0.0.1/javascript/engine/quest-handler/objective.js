class Objective {
    constructor(count, task) {
        this.count = count;
        this.task = task;

        this.desc = "-";

        this.current = 0;
        this.complete = false;
    }

    addDesc(str) {
        this.desc = str;
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