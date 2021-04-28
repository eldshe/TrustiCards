import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../shared/global-data.service';


@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss']
})
export class DescriptionsComponent implements OnInit {

  constructor(
    public GD: GlobalDataService // Global Data service instance
    ) { }

  ngOnInit(): void {
    }

    // Instructions strings
    inst_1 = "See where is the queen";
    inst_2 = "Click START to begin";
    inst_3 = "Follow the queen";
    inst_4 = "Pick the card with the queen to get your bonus";

  }

