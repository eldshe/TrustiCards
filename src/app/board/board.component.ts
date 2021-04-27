import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalDataService } from '../shared/global-data.service';
import { Sounds } from '../shared/audio/sounds';
import { localData, dataStructure } from '../shared/localStorage';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss', './cards.scss', './animations.scss', '../popup/popup.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(

    public GD: GlobalDataService,    // Global Data service instance
    public sounds: Sounds,    // Sound control service instance
    private local: localData,   // Local storage integration service instance
    public currencyPipe: CurrencyPipe   // Currency pipe instance

    ) {  } 

  title: string = "Catch the queen and get the BONUS";
  counter: number = 0;      // shuffle counter
  chosen: number | null = null;

  ngOnInit(): void {
    // Play background sound
    this.sounds.BGplay();
  }

  isHidden() {
    return this.GD.status == 2 || this.GD.status == 3;
  }
  oneOrTwo() {
    return this.GD.status == 1 || this.GD.status == 2;
  }
  hoverSound() {
    this.sounds.buttonHover();
  }

  start(): void {
    //reset after restart btn pressed:
    this.chosen = null;
    this.GD.Correct(false);
    //end

    //play sound :
    this.sounds.BGstop();

    this.sounds.buttonClick();
    this.GD.setStatus(1);
    this.title = "Watch carefully...";

    //animations here:
    //// cards flip sound --> delay:1500
    //// cards container enlarge (with status's change) ---> delay:0
    //// queen card bounce --> delay:500 | duration:600
    //// all cards flip --> delay:1500 | duration:600
    

    this.sounds.trippleCardFlip();
    let queenCardsContainer = document.getElementById("queen").closest(".flip-card");
    queenCardsContainer.classList.add("bounce");

    // wait 2 seconds before shuffling (meanwhile play animations above)
    setTimeout(() => {
      queenCardsContainer.classList.remove("bounce");
      this.GD.setStatus(2);
      this.shuffle();
    }, 2000);

  }

  shuffle(): void {
    let rnd = Math.floor(Math.random() * 3); // random number between 0-2 (for three shuffle posibilities)
    this.shuffleMethods(rnd);
    this.counter++;

    //recursively shuffle 5 times:
    setTimeout(() => {
      if (this.counter < 6) {
        this.shuffle();
      }
      else {
        this.counter = 0;
        setTimeout(() => {
          // wait for shuffle to end        
          this.choose();
        }, 500)
      }
    }, 600);
  }

  shuffleMethods(method: number) {
    let lefty = document.getElementsByClassName("left")[0];
    let righty = document.getElementsByClassName("right")[0];
    let middle = document.getElementsByClassName("middle")[0];

    switch (method) {
      case 0: // switch 1 and 3            
        lefty.classList.remove("left"); lefty.classList.add("right", "shuffleRight");
        righty.classList.remove("right"); righty.classList.add("left", "shuffleLeft");
        break;
      case 1: // switch 2 and 3
        middle.classList.remove("middle"); middle.classList.add("right", "shuffleRight");
        righty.classList.remove("right"); righty.classList.add("middle", "shuffleLeft");
        break;
      case 2: // switch 1 and 2
        lefty.classList.remove("left"); lefty.classList.add("middle", "shuffleRight");
        middle.classList.remove("middle"); middle.classList.add("left", "shuffleLeft");
        break;
    }
    this.sounds.cardSwipe();
    setTimeout(() => {
      //clean shuffle classes          
      this.cleanStyles()
    }, 400);
  }

  cleanStyles() {
    let lefty = document.getElementsByClassName("left")[0];
    let righty = document.getElementsByClassName("right")[0];
    let middle = document.getElementsByClassName("middle")[0];
    lefty.classList.remove("shuffleLeft"); righty.classList.remove("shuffleRight");
    middle.classList.remove("shuffleLeft"); middle.classList.remove("shuffleRight");
  }

  choose() {
    this.GD.setStatus(3);
    this.title = "where is the Queen?";
    this.cleanStyles();
  }

  end(card: HTMLElement) {
    this.sounds.cardFlip();
    this.GD.setStatus(4);
    setTimeout(() => {
      if (card.closest(".flip-card").querySelector("#queen") !== null)
        this.GD.Correct(true);
      else if (card.closest(".flip-card").querySelector("#card3") !== null)
        this.chosen = 3;
      else if (card.closest(".flip-card").querySelector("#card5") !== null)
        this.chosen = 5;

      this.popup();
    }, 20); // after 20 ms because card faces should be rerendered in status change (4)
  }

  popup() {
    // let the user see the chosen card for 1 second and then pop up
    setTimeout(() => {
      this.GD.setStatus(5);
      this.GD.correct ? this.sounds.correct() : this.sounds.fail();
    }, 1000);
  }
}
