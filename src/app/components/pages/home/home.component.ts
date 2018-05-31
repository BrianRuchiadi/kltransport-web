import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  shortcutRoute: Station[];
  filteredFromStations: Station[];
  filteredToStations: Station[];
  fare: Fare;
  stationFrom: Station;
  stationTo: Station;
  firstParam: String;
  secondParam: String;
  routeFrom: String;
  routeTo: String;
  isShortcut: Boolean;
  //
  constructor(
    private routesService: RoutesService,
    private stationsService: StationsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.firstParam = this.route.snapshot.params.routeOne;
    this.secondParam = this.route.snapshot.params.routeTwo;

    this.routeFrom = this.firstParam.replace('-', ' ');
    this.routeTo = this.secondParam.replace('-', ' ');
    this.isShortcut = false;
    //
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
  }

  displayRoute(type) {
    this.isShortcut = (type === 'full') ? false : true;
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
      });
  }

  getRoutesDetails() {
    if (!this.stationFrom || !this.stationTo) {
      this.bestRoute = [];
      this.fare = null;
      return;
    }
    this.firstParam = this.stationFrom.name.replace(' ', '-').toLowerCase();
    this.secondParam = this.stationTo.name.replace(' ', '-').toLowerCase();

    this.updateParam();
    this.spinnerService.show();
    //
    return this.routesService.getRoutesDetails(this.stationFrom, this.stationTo)
      .subscribe(response => {
        this.spinnerService.hide();
        this.bestRoute = response.bestRoute;
        this.fare = response.fare;
        this.spinnerService.hide();
        this.initRouteShortcut();
      });
  }

  initRouteShortcut() {
    let lineIdx = [];
    this.shortcutRoute = [];

    lineIdx = this.bestRoute.map((route) => route.line.id);
    lineIdx = lineIdx.filter((value, index, arr) => arr.indexOf(value) === index);

    for (let id of lineIdx) {
      let linesRoute = [];
      linesRoute = this.bestRoute.filter((route) => route.line_id === id);

      if (linesRoute.length > 1) {
        this.shortcutRoute.push(linesRoute[0]);
        this.shortcutRoute.push(linesRoute[linesRoute.length - 1]);
      } else {
        this.shortcutRoute.push(linesRoute[0]);
      }
    }

    this.isShortcut = (this.shortcutRoute.length > 3) ? true : false;
  }

  initStations() {
    let countFrom = 0;
    let countTo = 0;

    for (let line of this.lines) {
      for (let node of line.nodes) {
        node['line_icon'] = line.icon;
        this.stations.push(node);

        if (node.name.toLowerCase() === this.routeFrom && countFrom < 1) {
          this.stationFrom = node;
          countFrom++;
        }

        if (node.name.toLowerCase() === this.routeTo && countTo < 1) {
          this.stationTo = node;
          countTo++;
        }
      }
    }
    this.checkStationValidity();
  }

  updateParam() {
    this.location.replaceState('mrt/' + this.firstParam + '/' + this.secondParam);
  }

  // revert to default putra heights route when the parameter is invalid, id : 8
  checkStationValidity() {
    if (!this.stationFrom) {
      this.stationFrom = this.getSelectedStation(8);
    }

    if (!this.stationTo) {
      this.stationTo = this.getSelectedStation(8);
    }
  }

}
