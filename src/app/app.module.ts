import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { StationsComponent } from './components/pages/stations/stations.component';
import { FaresComponent } from './components/pages/fares/fares.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LinesComponent } from './components/pages/lines/lines.component';

import { LinesService } from './services/lines.service';
import { StationsService } from './services/stations.service';
import { FaresService } from './services/fares.service';
import { RoutesService } from './services/routes.service';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    StationsComponent,
    FaresComponent,
    HeaderComponent,
    HomeComponent,
    LinesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    LinesService,
    StationsService,
    FaresService,
    RoutesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
