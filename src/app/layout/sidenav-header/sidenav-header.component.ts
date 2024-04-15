import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav-header',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, RouterModule],
  templateUrl: './sidenav-header.component.html',
  styleUrl: './sidenav-header.component.scss',
})
export class SidenavHeaderComponent {}
