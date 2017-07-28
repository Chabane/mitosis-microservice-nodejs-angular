import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select, select$, WithSubStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { cellComponentReducer } from './reducers';
import { ICell } from '../model';

/**
 * Fractal component example.
 */
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: cellComponentReducer,
})
@Component({
  selector: 'mi-cell',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  static readonly ADD_SIZE = 'ADD_SIZE';
  static readonly REMOVE_SIZE = 'REMOVE_SIZE';

  @Input() key: string;
  @Input() cellType: string;

  @select() readonly name$: Observable<string>;
  @select('size') readonly numSizes$: Observable<number>;
  @select('color') readonly color$: Observable<number>;

  getBasePath = () => this.key ?
    [this.cellType, 'items', this.key] :
    null;

  @dispatch() addSize = () => ({ type: 'ADD_SIZE' });
  @dispatch() removeSize = () => ({ type: 'REMOVE_SIZE' });
}
