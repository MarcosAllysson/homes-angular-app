import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';

// IMPORTS
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HomeComponent,
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'Hello Universe';

  // isLogged: boolean = true;
  // anyArray: any[] = ['jesus', 'God', 'father', 'love', 'justice'];

  // person: any = {
  //   name: '',
  //   age: null
  // }

  onMouseOver() {
    alert('Way to go 🚀');
  }
}
