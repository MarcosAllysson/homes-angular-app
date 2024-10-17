import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },

    // with no parameter
    {
        path: 'details',
        component: DetailsComponent,
        title: 'Details Page'
    },

    // to get a parameter and pass it to the component
    // update the component to get id and show it.
    // the param name has to match or it won't work
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    }
];
