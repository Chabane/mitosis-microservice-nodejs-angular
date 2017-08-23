import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import { CellType, ICell } from './cell.model';

// We use the gql tag to parse our query string into a query document
const GetCellsByTypes = gql`
        query GetCellByTypes($type:CellType) {
          cellsByType(type:$type) {
            id
            name
            type
          }
        }`;

const GetCells = gql`
        query GetCells {
          cells {
            id
            name
            type
          }
        }`;

const GetNewCell = gql`
        subscription GetNewCell {
            newCell {
              id
              name
              type
            }
        }`;
                
@Injectable()
export class CellService {
  constructor(private apollo: Apollo) {
  }

  getNewCell(): Observable<ICell> {
      return this.apollo.subscribe({
        query: GetNewCell
      });
    }

  getAllByType(type: CellType): ApolloQueryObservable<Array<ICell>> {
    return this.apollo.watchQuery({
      query: GetCellsByTypes,
      variables: {
        type: type
      }
    });
  }

  getAll(): ApolloQueryObservable<Array<ICell>> {
    return this.apollo.watchQuery({
      query: GetCells
    });
  }
}
