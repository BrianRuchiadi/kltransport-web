import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FaresComponent } from './components/pages/fares/fares.component';
import { StationsComponent } from './components/pages/stations/stations.component';
import { LinesComponent } from './components/pages/lines/lines.component';

const routes: Routes = [
  { path: 'mrt/:routeOne/:routeTwo', component: HomeComponent },
  { path: '**', redirectTo: 'mrt/putra-heights/putra-heights' },
  // { path: 'about', component: AboutComponent },
  // { path: 'fares', component: FaresComponent },
  // { path: 'stations', component: StationsComponent },
  // { path: 'lines', component: LinesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
