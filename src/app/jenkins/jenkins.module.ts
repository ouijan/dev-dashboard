import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';

import  { JenkinsService } from './jenkins.service';
import { BuildsComponent } from './builds.component';

@NgModule({
	declarations: [BuildsComponent],
	imports: [CoreModule],
  exports: [BuildsComponent],
  providers: [JenkinsService],
})
export class JenkinsModule { }