import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserLoginComponent],
  exports: [UserLoginComponent],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
