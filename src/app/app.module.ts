import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Router module for routing

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './app.routes';  // Import the routing configuration
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,    // Root component
    DashboardComponent // Add other components here
  ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    RouterModule.forRoot(appRoutes), // Set up routing
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrap the root component
})
export class AppModule {}
