import { NgModule } from '@angular/core';

import { HttpModule }    from '@angular/http';
import { MaterialModule } from '../material/material.module';

import  { JenkinsService } from './jenkins.service';
import { BuildsComponent } from './builds.component';

@NgModule({
	declarations: [BuildsComponent],
	imports: [HttpModule, MaterialModule],
  exports: [BuildsComponent],
  providers: [JenkinsService],
})
export class JenkinsModule { }