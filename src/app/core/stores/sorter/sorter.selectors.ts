// import { Selector } from '@ngxs/store';
// import { PelicanState, pelicanEntityAdapter } from './pelican.state';
// import { PelicanStateModel } from './pelican-state.model';
// import { Pelican } from 'src/app/shared';


// // Step 1. define a class with static methods for holding the selectors
// export class PelicanSelectors {

//   @Selector([PelicanState])
//   static allPelicans(state: PelicanStateModel) {
//     return pelicanEntityAdapter.getSelectors().selectAll(state);
//   }
  
//   // example of composition
//   @Selector([PelicanSelectors.allPatterns, MigrationSelectors.migrations])
//   static migratingPelicans(pelicans: Pelican[], migrations: Migration[]) {
//     return pelicans.filter(pelican => migrations.some(migration => migration.animalId === pelican.id));
//   }
  
//   // example of business logic
//   @Selector([PelicanSelectors.allPatterns])
//   static pelicanCount(pelicans: Pelican[]) {
//     return pelicans.length;
//   }

//   @Selector([PelicanSelectors.allPatterns, MigrationSelectors])
//   static hasPelicans(pelicans: Pelican[]) {
//     return pelicans.length > 0;
//   }

// }