import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { CanReadGuard } from './guards/can-read.guard';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { stores } from './stores';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
@NgModule({
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgxsModule.forRoot(stores, { developmentMode: !environment.production }),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  declarations: [],
  providers: [
    AdminGuard,
    CanReadGuard,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
})
export class CoreModule {}
