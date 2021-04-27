import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../shared/global-data.service';
import { CurrencyPipe } from '@angular/common';
import { Sounds } from '../shared/audio/sounds';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private GD: GlobalDataService, private currencyPipe: CurrencyPipe, private sounds: Sounds) {
    // Inner pipe for currency:
    this.currencyPipeStr = currencyPipe.transform(65, 'GBP'); 
  }

  ngOnInit(): void {

  }

  currencyPipeStr: string;
  content: string = this.GD.correct ? this.currencyPipeStr + " bingo bonus" : "Try again next time :)";
  title: string = this.GD.correct ? "Congrats," : "oh no!";
  subtitle: string = this.GD.correct ? "You've won!" : "You didn't win this round";

  // Update game status
  setStatus(num: number) {
    this.GD.setStatus(num);
  }

  // Update points and restart game
  goAgain() {
    this.GD.correct ? this.GD.addWin() : this.GD.addLose();
    this.GD.setStatus(0);
    this.sounds.BGplay();
  }

  // Avoid double firing when clicking on "play again" mouse.
  // Start again when clicking also on overlay
  overlayClk(e: MouseEvent) {

    if ((e.target as HTMLElement).id === "popupOverlay")
      this.goAgain();
  }

}
