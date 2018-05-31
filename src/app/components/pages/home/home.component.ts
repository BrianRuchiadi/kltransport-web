import { Component, OnInit } from '@angular/core';

import { Station } from './../../../classes/station';
import { Fare } from './../../../classes/fare';
import { Line } from './../../../classes/line';

import { RoutesService } from './../../../services/routes.service';
import { StationsService } from './../../../services/stations.service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../styles/pages/_home.scss']
})
export class HomeComponent implements OnInit {
  lines: Line[];
  stations: Station[];
  bestRoute: Station[];
  filteredFromStations: Station[];
  filteredToStations: Station[];
  fare: Fare;
  stationFrom: Station;
  stationTo: Station;
  //
  constructor(
    private routesService: RoutesService,
    private stationsService: StationsService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.initVariablesValues();
    this.getStations();
  }

  initVariablesValues() {
    this.lines = [];
    this.stations = [];
    this.bestRoute = [];
    this.filteredFromStations = [];
    this.filteredToStations = [];
  }

  triggerSearch(ev, type) {
    const val = ev.target.value;
    if (!val || val.trim() === '') {
      return;
    }
    //
    if (type === 'from') {
      this.filteredFromStations = [];
      this.filteredFromStations = this.stations.filter(
        (station) => {
          return (station.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || station.name_ref.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      );
      this.filteredFromStations.length = (this.filteredFromStations.length > 5) ? 5 : this.filteredFromStations.length;
    } else {
      this.filteredToStations = [];
      this.filteredToStations = this.stations.filter(
        (station) => {
          return (station.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || station.name_ref.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      );
      this.filteredToStations.length = (this.filteredToStations.length > 5) ? 5 : this.filteredToStations.length;
    }

    console.log(['search results', this.filteredFromStations]);
  }

  // changeSelectedStation(ev, selectedVar) {
  //   if (selectedVar === 'stationFrom') {
  //     this.stationFrom = this.getSelectedStation(+ev.target.value);
  //   } else {
  //     this.stationTo = this.getSelectedStation(+ev.target.value);
  //   }
  //   this.getRoutesDetails();
  // }

  switchFromTo() {
    [this.stationFrom, this.stationTo] = [this.stationTo, this.stationFrom];
    this.bestRoute = this.bestRoute.reverse();
  }

  removeStation(type) {
    if (type === 'from') {
      this.stationFrom = null;
    } else {
      this.stationTo = null;
    }

    this.getRoutesDetails();
  }

  changeStation(type, id) {
    if (type === 'from') {
      this.stationFrom = this.getSelectedStation(id);
      this.filteredFromStations = [];
    } else {
      this.stationTo = this.getSelectedStation(id);
      this.filteredToStations = [];
    }

    this.getRoutesDetails();
  }

  getSelectedStation(id) {
    return this.stations.filter((station) => station.id === id)[0];
  }

  getStations() {
    return this.stationsService.getStations()
      .subscribe(response => {
        this.lines = response;
        this.initStations();
        this.getRoutesDetails();
        console.log(['getStations in HomeComponent called, and this.lines is set', this.lines]);
      });
  }

  getRoutesDetails() {
    if (!this.stationFrom || !this.stationTo) {
      this.bestRoute = [];
      this.fare = null;
      return;
    }
    this.spinnerService.show();
    //
    return this.routesService.getRoutesDetails(this.stationFrom, this.stationTo)
      .subscribe(response => {
        this.spinnerService.hide();
        this.bestRoute = response.bestRoute;
        this.fare = response.fare;
        this.spinnerService.hide();
        console.log(['this.bestRoutes and this.fare after getRoutesDetails', this.bestRoute, this.fare]);
      });
  }

  initStations() {
    for (let line of this.lines) {
      for (let node of line.nodes) {
        node['line_icon'] = line.icon;
        this.stations.push(node);
      }
    }
    this.stationFrom = this.stations[0];
    this.stationTo = this.stations[0];
  }

}
