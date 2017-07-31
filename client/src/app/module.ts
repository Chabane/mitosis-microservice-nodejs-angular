import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

// This app's ngModules
import { StoreModule } from './store/module';
import { CellModule } from './cells/module';
import { ProcaryoteModule } from './procaryotes/module';
import { EucaryoteModule } from './eucaryotes/module';
import { FeedbackModule } from './feedback/module';

// Top-level app component constructs.
import { appRoutes } from './routes';
import { AppComponent } from './component';
import { provideClient } from './graphql';


@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    NgReduxRouterModule,
    CellModule,
    ProcaryoteModule,
    EucaryoteModule,
    FeedbackModule,
    StoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
