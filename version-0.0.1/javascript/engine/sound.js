class SoundObject {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("onended", "this.play()");
        this.sound.volume = 0.5;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);


        this.allowed = false;
        this.count = 0;
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    check() {
        if (this.allowed && this.count == 0) {
            this.count++;
            this.play();
        }
    }
}
