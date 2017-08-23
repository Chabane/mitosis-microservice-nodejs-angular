import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

// Top-level app component constructs.
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { provideClient } from './graphql';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    NoopAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ApolloModule.forRoot(provideClient),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
