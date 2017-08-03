import { Injectable } from '@angular/core';

import { CELL_TYPES } from '../cells/model';
import { GetCellsAPIEpics } from '../cells/api/list/epics';
import { SubscribeMoreCellAPIEpics } from '../cells/api/more/epics';

@Injectable()
export class RootEpics {
  constructor(private getCellsAPIEpics: GetCellsAPIEpics,
    private subscribeMoreCellAPIEpics: SubscribeMoreCellAPIEpics) { }

  public createEpics() {
    return [
      this.getCellsAPIEpics.createEpic(CELL_TYPES.PROCARYOTE),
      this.getCellsAPIEpics.createEpic(CELL_TYPES.EUCARYOTE),
      this.subscribeMoreCellAPIEpics.createEpic(CELL_TYPES.EUCARYOTE),
    ];
  }
}
