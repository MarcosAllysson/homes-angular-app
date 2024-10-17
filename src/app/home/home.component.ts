import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { IHousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: IHousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  // filtering
  filteredLocationList: IHousingLocation[] = [];

  // make Dependecy Injection directly on construtor. No need to declare variable above
  // constructor(housingService: HousingService) {
  //   this.housingLocationList = housingService.getAllHousingLocations();
  // }

  // make Dependecy Injection this way: declaring above and just using in construtor
  constructor() {
    // this.gethousingLocationListWithoutApiCall();
    // this.gethousingLocationListWithFetch();
    this.gethousingLocationListWithHttpClient();
  }

  // print(event: any) {
  //   console.log(event);
  // }

  gethousingLocationListWithoutApiCall() {
    this.housingLocationList = this.housingService.getAllHousingLocationsLocally();
    this.filteredLocationList = this.housingLocationList;
  }

  gethousingLocationListWithFetch() {
    this.housingService.getAllHousingLocations().then((housingLocationList: IHousingLocation[]) => {
      this.housingLocationList = housingLocationList;

      //filtering
      this.filteredLocationList = housingLocationList;
    });
  }

  gethousingLocationListWithHttpClient() {
    this.housingService
      .getAllHousingLocationsHC()
      .subscribe((res) => {
        this.housingLocationList = res;
        this.filteredLocationList = res;
      });
  }

  filterResults(filterValue: string) {
    console.log(`FILTER: ${filterValue}`);

    if (!filterValue) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      let tempList: IHousingLocation[] = [];

      // FOR SOME REASON, ITS NOT WORKING
      // this.filteredLocationList = this.housingLocationList.filter(
      //   housingLocation => {
      //     housingLocation?.city
      //       .toLowerCase()
      //       .includes(filterValue.toLowerCase())
      //   });

      this.housingLocationList.forEach(housingLocation => {
        if (housingLocation?.city.toLowerCase().includes(filterValue.toLowerCase())) {
          tempList.push(housingLocation);
        }
      });

      this.filteredLocationList = tempList;
    }
  }
}
