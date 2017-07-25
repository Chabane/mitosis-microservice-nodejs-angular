import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { CELL_TYPES, CellType, ICell, fromServer } from '../model';

// A fake API on the internets.
const URLS = {
  [CELL_TYPES.PROCARYOTE]: 'http://www.mocky.io/v2/59200c34110000ce1a07b598',
  [CELL_TYPES.EUCARYOTE]: 'http://www.mocky.io/v2/5920141a25000023015998f2',
};

@Injectable()
export class CellAPIService {
  constructor(private http: Http) {}

  getAll = (cellType: CellType): Observable<ICell[]> =>
    this.http.get(URLS[cellType])
      .map(resp => resp.json())
      .map(records => records.map(fromServer));
}
