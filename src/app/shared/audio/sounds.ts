import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Sounds {

    buttonClick() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/btnClk.wav";
        audio.load();
        audio.play();
    }

    buttonHover() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/btnHvr.wav";
        audio.load();
        audio.play();
    }

    BGaudio = new Audio("../../../assets/audio/BG.mp3");
    BGplay() {
        if (this.BGaudio.currentTime !== null && this.BGaudio.currentTime == 0)
            this.BGaudio.load();
        this.BGaudio.play();
    }
    BGstop() {
        this.BGaudio.pause();
    }

    cardFlip() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/cardFlip.wav";
        audio.load();
        audio.play();
    }

    trippleCardFlip() {
        let audio = new Audio(); let audio2 = new Audio(); let audio3 = new Audio();
        audio.src, audio2.src, audio3.src = "../../../assets/audio/cardFlip.wav";
        audio.load(); audio2.load(); audio3.load();
        // delayed for 1.5 seconds, like the flip animation
        setTimeout(() => {
            //1        
            audio.play();
            //2
            setTimeout(() => audio2.play(), 200);
            //3
            setTimeout(() => audio3.play(), 300);
        }, 1500)
    }

    cardHovr() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/cardHvr.ogg";
        audio.load();
        audio.play();
    }


    cardSwipe() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/crdSwipe.wav";
        audio.load();
        audio.play();
    }

    correct() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/correct.wav";
        audio.load();
        audio.play();
    }

    fail() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/fail.mp3";
        audio.load();
        audio.play();
    }

}

