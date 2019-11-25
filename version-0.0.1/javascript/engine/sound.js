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

        // this.sound.addEventListener("onended", function(){
            // this.sound.currentTime = 0;
            // console.log("ended");
        // });
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    reset() {
        this.count = 0;
        this.play();
    }

    check() {
        if (this.allowed && this.count == 0) {
            this.count++;
            this.play();
        }
    }
}
