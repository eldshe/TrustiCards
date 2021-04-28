import { Injectable } from '@angular/core';

export interface dataStructure {
    wins: number,
    loses: number,
    points: number
}

@Injectable({
    providedIn: 'root'
})
export class localData {

    constructor() {

    }

    // Send statistics data to localStorage 
    setData(data: dataStructure) {
        localStorage.setItem("points", JSON.stringify(data));
    }

    // Get statistics data to localStorage 
    getData: () => dataStructure = () => {
        if (localStorage.getItem("points") == null)
            return { wins: 0, loses: 0, points: 0 }
        return JSON.parse(localStorage.getItem("points")) as dataStructure;
    }

}

