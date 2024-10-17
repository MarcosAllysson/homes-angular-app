import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HousingService } from '../housing.service';
import { IHousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  housingService = inject(HousingService);
  housingLocation: IHousingLocation | undefined;
  housingLocationId = 0;

  applyForm = new FormGroup({
    firsName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.email),
  });

  constructor() {
    // the param has to match with routes.ts or it won't work
    // const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    // this.getHousingLocationWithoutApiCall();
    // this.getHousingLocationApiFetch();
    this.getHousingLocationApiHttpClient();
  }

  getHousingLocationWithoutApiCall() {
    //NO API CALL 
    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  getHousingLocationApiFetch() {
    // API CALL - WITH FETCH
    // this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
    //   this.housingLocation = housingLocation;
    // });

    this.housingService.getHousingLocationById(this.housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  getHousingLocationApiHttpClient() {
    this.housingService
      .getHousingLocationByIdHC(this.housingLocationId)
      .subscribe((res) => {
        this.housingLocation = res;
      });
  }

  deleteHousingLocationById(id?: number) {
    if (id) {
      this.housingService
        .deleteHousingLocationByIdHC(this.housingLocationId)
        .subscribe((res) => {
          this.router.navigate(['']);
          this.getHousingLocationApiHttpClient();
        });
    }
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firsName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );

    // this.applyForm.reset();
  }
}
