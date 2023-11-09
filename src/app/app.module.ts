import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApmModule, ApmService } from '@elastic/apm-rum-angular';
import { ErrorHandler } from '@angular/core'
import { ApmErrorHandler } from '@elastic/apm-rum-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApmModule
  ],
  providers: [
    ApmService,
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    const git = require('git-rev-sync')
    const serviceVersion = git.short()
    const apm = service.init({
      serviceName: 'my-service-name',
      serverUrl: 'http://localhost:8200',
      serviceVersion: serviceVersion,
      environment: 'my-environment'
    })

    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    })
  }
}
