import { Injectable } from '@angular/core';

import { CELL_TYPES } from '../cells/model';
import { GetCellsAPIEpics } from '../cells/api/list/epics';
import { SubscribeMoreCellsAPIEpics } from '../cells/api/more/epics';

@Injectable()
export class RootEpics {
  constructor(private getCellsAPIEpics: GetCellsAPIEpics,
    private subscribeMoreCellsAPIEpics: SubscribeMoreCellsAPIEpics) { }

  public createEpics() {
    return [
      this.getCellsAPIEpics.createEpic(CELL_TYPES.PROCARYOTE),
      this.getCellsAPIEpics.createEpic(CELL_TYPES.EUCARYOTE),
      this.subscribeMoreCellsAPIEpics.createEpic(CELL_TYPES.PROCARYOTE),
      this.subscribeMoreCellsAPIEpics.createEpic(CELL_TYPES.EUCARYOTE),
    ];
  }
}
