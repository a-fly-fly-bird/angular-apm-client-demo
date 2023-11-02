import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApmService } from '@elastic/apm-rum-angular';
import { ErrorHandler } from '@angular/core'
import { ApmErrorHandler } from '@elastic/apm-rum-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApmService,
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'angular-app',
      serverUrl: 'http://localhost:8200'
    })

    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    })
  }
}
