import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuperSecretComponent } from './super-secret.component';

const routes: Routes = [
  {
    path: '',
    component: SuperSecretComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SuperSecretComponent],
})
export class SuperSecretModule {}
