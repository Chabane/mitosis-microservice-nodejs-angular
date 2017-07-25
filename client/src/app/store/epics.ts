import { Injectable } from '@angular/core';

import { CELL_TYPES } from '../cells/model';
import { CellAPIEpics } from '../cells/api/epics';

@Injectable()
export class RootEpics {
  constructor(private cellEpics: CellAPIEpics) {}

  public createEpics() {
    return [
      this.cellEpics.createEpic(CELL_TYPES.PROCARYOTE),
      this.cellEpics.createEpic(CELL_TYPES.EUCARYOTE),
    ];
  }
}
