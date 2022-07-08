import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '@guards/admin.guard';
import { CanReadGuard } from '@guards/can-read.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./main/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./main/pages/menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: 'content',
    canActivate: [CanReadGuard],
    loadChildren: () =>
      import('./main/pages/subscriber-page/subscriber-page.module').then(
        (m) => m.SubscriberPageModule
      ),
  },
  {
    path: 'secret',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./main/pages/super-secret/super-secret.module').then(
        (m) => m.SuperSecretModule
      ),
  },
  {
    path: 'settings',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./main/pages/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
