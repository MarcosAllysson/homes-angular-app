import { Injectable } from '@angular/core';

// API CALLS
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { IHousingLocation } from './housing-location';
import { environment } from '../environments/environment';

// const BASE_URL: string = environment.baseURL;


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  // to load from API call.
  url: string = 'http://localhost:3000/';
  // url: string = 'http://localhost:3000/locations';
  // url: string = environment.baseUrl.url;

  // housingLocationList: IHousingLocation[] = [];


  // to load locally. Using a variable
  housingLocationList: IHousingLocation[] = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: '/assets/mansion.png',
      availableUnits: 4,
      wifi: true,
      laundry: true
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: '/assets/mansion.png',
      availableUnits: 0,
      wifi: false,
      laundry: true
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: '/assets/mansion.png',
      availableUnits: 1,
      wifi: false,
      laundry: false
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: '/assets/mansion.png',
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: '/assets/mansion.png',
      availableUnits: 1,
      wifi: true,
      laundry: false
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/mansion.png',
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/mansion.png',
      availableUnits: 5,
      wifi: true,
      laundry: true
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/mansion.png',
      availableUnits: 2,
      wifi: true,
      laundry: true
    },
    {
      id: 8,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: '/assets/mansion.png',
      availableUnits: 10,
      wifi: false,
      laundry: false
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: '/assets/mansion.png',
      availableUnits: 6,
      wifi: true,
      laundry: true
    }
  ];

  constructor(
    private httpClient: HttpClient
  ) {
    // console.log(`API: ${this.urlApi}`);
  }

  /* 
    API CALL - WITH HTTP_CLIENT
  */
  getAllHousingLocationsHC(): Observable<IHousingLocation[]> {
    let url: string = `${this.url}locations`;

    return this.httpClient
      .get<IHousingLocation[]>(url)
      .pipe(take(1));
  }

  getHousingLocationByIdHC(id: number): Observable<IHousingLocation> {
    let url: string = `${this.url}locations/${id}`;

    return this.httpClient
      .get<IHousingLocation>(url)
      .pipe(take(1));
  }

  createOrEditHousingLocation(housingLocation?: IHousingLocation) {
    if (housingLocation?.id !== null && housingLocation?.id !== undefined) {
      return this.editHousingLocation(housingLocation);
    }

    return this.createHousingLocation(housingLocation);
  }

  private createHousingLocation(housingLocation: IHousingLocation | undefined) {
    let url: string = `${this.url}locations`;

    return this.httpClient.post<IHousingLocation>(url, housingLocation);
  }

  private editHousingLocation(housingLocation: IHousingLocation) {
    let url = `${this.url}/${housingLocation.id}`

    return this.httpClient.put<IHousingLocation>(url, housingLocation);
  }

  deleteHousingLocationByIdHC(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.url}/${id}`)
      .pipe(take(1));
  }


  /* 
    API CALL - WITH FECTH
  */
  async getAllHousingLocations(): Promise<IHousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: Number): Promise<IHousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async submitApplication(firsName: string, lastName: string, email: string) {
    console.log(firsName, lastName, email);
  }


  /* 
    WIHOUT API CALL
  */
  getAllHousingLocationsLocally(): IHousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationByIdLocally(id: Number): IHousingLocation | undefined {
    // for some reason, the code below did not work
    // return this.housingLocationList.find(housingLocation => {
    //   housingLocation.id === id
    // });


    // as .find above did not work, I found another option.
    let houseElement: IHousingLocation | undefined;
    this.housingLocationList.forEach(element => {
      if (element.id === id)
        houseElement = element;
    });

    return houseElement;
  }

  submitApplicationLocally(firsName: string, lastName: string, email: string) {
    console.log(firsName, lastName, email);
  }
}
