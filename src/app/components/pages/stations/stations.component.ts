import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../../services/stations.service';

import { Line } from './../../../classes/line';
import { Station } from './../../../classes/station';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['../../../styles/pages/_stations.scss']
})
export class StationsComponent implements OnInit {
  lines: Line[];
  stations: Station[];
  filteredStations: Station[];

  constructor(
    private stationsService: StationsService,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.initVariablesValues();
    //
    this.spinnerService.show();
    this.getStations();
  }

  initVariablesValues() {
    this.lines = [];
    this.stations = [];
    this.filteredStations = [];
  }

  initStations() {
    for (let line of this.lines) {
      for (let node of line.nodes) {
        this.stations.push(node);
      }
    }
  }

  triggerSearch(ev) {
    this.filteredStations = [];
    const val = ev.target.value;

    if (!val || val.trim() === '') {
      return;
    }

    this.filteredStations = this.stations.filter(
      (station) => {
        return (station.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        || station.name_ref.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
    );

    this.filteredStations.length = (this.filteredStations.length > 5) ? 5 : this.filteredStations.length;
  }

  getStations() {
    return this.stationsService.getStations()
      .subscribe(response => {
        this.lines = response;
        this.initStations();
        this.spinnerService.hide();
        console.log(['getStations in StationsComponent called, and this.lines is set', this.lines]);
      });
  }

}
