import { Component, OnInit } from '@angular/core';
import { LinesService } from '../../../services/lines.service';

import { Line } from '../../../classes/line';
import { Station } from '../../../classes/station';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['../../../styles/pages/_lines.scss']
})
export class LinesComponent implements OnInit {
  lines: Line[];
  stations: Station[];

  constructor(
    private lineService: LinesService
  ) { }

  ngOnInit() {
    this.getLines();
  }

  getLines() {
    return this.lineService.getLines()
      .subscribe(response => {
        this.lines = response;
        console.log(['getLines in LinesComponent called, and this.lines is set', this.lines]);
      });
  }
}
