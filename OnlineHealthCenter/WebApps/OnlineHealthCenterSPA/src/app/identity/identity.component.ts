import { Component } from '@angular/core';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent {
  formVisibility: boolean = false;

  showForm(): void {
    this.formVisibility = true;
  }
}
