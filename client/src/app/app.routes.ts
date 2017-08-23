import { AppComponent } from './app.component';


export const appRoutes = [
    { 
      path: 'cells', loadChildren: './cells/cell-list.module#CellListModule'
    },
    {
      path: '**', redirectTo: 'cells', pathMatch: 'full'
    }
];
