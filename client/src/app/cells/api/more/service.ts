import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { CellType, ICell } from '../../model';

const GetNewCell = gql`
        subscription GetNewCell($type:CellType!) {
            newCell (type:$type) {
              id
              name
              type
              color
              size
            }
        }`;

@Injectable()
export class SubscribeMoreCellAPIService {
  constructor(private apollo: Apollo) {
  }

  getNewCell(type: CellType): Observable<ICell> {
    return this.apollo.subscribe({
      query: GetNewCell,
      variables: {
        type: type
      }
    });
  }
}
