import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICell } from '../model';

@Component({
  selector: 'mi-cell-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellListComponent {
  @Input() cellsName: string;
  @Input() cellType: string;
  @Input() cells: Observable<Array<ICell>>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, cell: ICell) {
    return cell.id;
  }
}
