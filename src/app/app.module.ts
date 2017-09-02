import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { JenkinsModule } from './jenkins/jenkins.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    JenkinsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
