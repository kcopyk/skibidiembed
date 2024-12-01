import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,    // Root component
    DashboardComponent // Add other components here
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes) // Add routing configuration
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule {}
