import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select, select$, WithSubStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { cellComponentReducer } from './reducers';
import { ICell } from '../model';

export const toSubTotal = (obs$: Observable<ICell>): Observable<number> =>
  obs$.map(s => s.ticketPrice * s.tickets);

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
  static readonly ADD_TICKET = 'ADD_TICKET';
  static readonly REMOVE_TICKET = 'REMOVE_TICKET';

  @Input() key: string;
  @Input() cellType: string;

  @select()                  readonly name$: Observable<string>;
  @select('tickets')         readonly numTickets$: Observable<number>;
  @select('ticketPrice')     readonly ticketPrice$: Observable<number>;
  @select$(null, toSubTotal) readonly subTotal$: Observable<number>;

  getBasePath = () => this.key ?
    [ this.cellType, 'items', this.key ] :
    null;

  @dispatch() addTicket = () => ({ type: 'ADD_TICKET' });
  @dispatch() removeTicket = () => ({ type: 'REMOVE_TICKET' });
}
