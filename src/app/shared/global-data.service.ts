import { Injectable } from '@angular/core';
import { dataStructure, localData } from './localStorage';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor(private localdata: localData) {
    this.points = this.localdata.getData();
  }

  // options :  0-before | 1-start | 2-shuffle | 3-choose | 4-end | 5-popup
  status: number = 0; 
  
  correct = false;
  points: dataStructure;

  // Set injectable var that represents if the user was correct choosing the queen card
  Correct(bool: boolean) {
    this.correct = bool;
  }

  // Set global game status
  setStatus(num: number) {
    this.status = num;
  }

  // Get updated statistics and points
  Points: () => dataStructure = () => {
    return this.points;
  }

  // Update statistics and points on in-app and on localStorage
  addWin() {
    this.points = { wins: this.points.wins + 1, loses: this.points.loses, points: this.points.points + 65 };
    this.localdata.setData(this.points);
  }

  // Update statistics and points on in-app and on localStorage
  addLose() {
    this.points = { wins: this.points.wins, loses: this.points.loses + 1, points: this.points.points };
    this.localdata.setData(this.points);
  }
}
