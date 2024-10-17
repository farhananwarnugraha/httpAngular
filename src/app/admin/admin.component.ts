import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
