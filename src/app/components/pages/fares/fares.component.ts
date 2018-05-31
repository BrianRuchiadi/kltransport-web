import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../../services/stations.service';
import { FaresService } from '../../../services/fares.service';

import { Line } from './../../../classes/line';
import { Station } from './../../../classes/station';
import { Fare } from './../../../classes/fare';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-fares',
  templateUrl: './fares.component.html',
  styleUrls: ['../../../styles/pages/_fares.scss']
})
export class FaresComponent implements OnInit {
  lines: Line[];
  fares: Fare[];
  selectedFare: Fare;
  stations: Station[];
  stationFrom: Station;
  stationTo: Station;

  constructor(
    private stationsService: StationsService,
    private faresService: FaresService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.initVariablesValues();
    //
    this.spinnerService.show();
    this.getStations();
    this.getFares();
  }

  initVariablesValues() {
    this.stations = [];
    this.lines = [];
    this.fares = [];
  }

  changeSelectedStation(ev, selectedVar) {
    if (selectedVar === 'stationFrom') {
      this.stationFrom = this.getSelectedStation(+ev.target.value);
    } else {
      this.stationTo = this.getSelectedStation(+ev.target.value);
    }

    this.selectedFare = this.getSelectedFare();
    console.log(['selectedFare now value is', this.selectedFare]);
  }

  getSelectedFare() {
    if (!this.stationFrom || !this.stationTo) { return; }

    const lowerId = (this.stationFrom.id <= this.stationTo.id) ? this.stationFrom.id : this.stationTo.id;
    const higherId = (this.stationFrom.id > this.stationTo.id) ? this.stationFrom.id : this.stationTo.id;

    return this.fares.filter((fare) => fare.node_from_id === lowerId && fare.node_to_id === higherId)[0];
  }

  getSelectedStation(id) {
    return this.stations.filter((station) => station.id === id)[0];
  }

  getStations() {
    return this.stationsService.getStations()
      .subscribe(response => {
        this.lines = response;
        this.initStations();
        console.log(['getStations in FaresComponent called, and this.lines is set', this.lines]);
      });
  }

  getFares() {
    return this.faresService.getFares()
      .subscribe(response => {
        this.fares = response;
        //
        this.selectedFare = this.getSelectedFare();
        this.spinnerService.hide();
        console.log(['getFares in FaresComponent called, and this.fares is set', this.fares]);
      });
  }

  initStations() {
    for (let line of this.lines) {
      for (let node of line.nodes) {
        this.stations.push(node);
      }
    }
    this.stationFrom = this.stations[0];
    this.stationTo = this.stations[0];
    console.log(['initStations in fare component', this.stations]);
  }
}
