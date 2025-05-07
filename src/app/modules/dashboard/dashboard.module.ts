import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { StudentsModule } from './modules/students/students.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
