import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieshop';

  constructor(private router: Router){}

  navigateToPage(pageName: string): void {
    this.router.navigate(['/' + pageName + '/']);
  }
}
