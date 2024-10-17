import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IHousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent implements OnInit {
  @Input() housingLocation!: IHousingLocation;
  // @Output() someValueOutput = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    // this.someValueOutput.emit({ text: 'here is a output' });
  }
}
