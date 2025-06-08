import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./modules/students/students.module')
      .then(file => file.StudentsModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module')
      .then(file => file.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
