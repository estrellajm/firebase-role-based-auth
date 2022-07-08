import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsResolver implements Resolve<Observable<string>> {
  resolve(): Observable<string> {
    return of('Route!').pipe(delay(2000));
  }
}
