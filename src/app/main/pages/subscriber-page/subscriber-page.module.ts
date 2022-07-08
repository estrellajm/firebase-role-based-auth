import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscriberPageComponent } from './subscriber-page.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriberPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SubscriberPageComponent],
})
export class SubscriberPageModule {}
