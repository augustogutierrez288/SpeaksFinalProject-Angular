import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'students',
    canActivate:[adminGuard],
    loadChildren: () => import('./modules/students/students.module')
      .then(file => file.StudentsModule)
  },
  {
    path: 'courses',
    canActivate:[adminGuard],
    loadChildren: () => import('./modules/courses/courses.module')
      .then(file => file.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
