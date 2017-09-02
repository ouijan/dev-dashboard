import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Build } from './build';
import { JenkinsService } from './jenkins.service';

@Component({
  selector: 'jenkins-builds',
  templateUrl: './builds.component.html',
})
export class BuildsComponent implements OnInit {
  title: string;
  builds: Build[];

	constructor(private jenkins: JenkinsService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.jenkins.getLiveBuildStatus()
      .then(data => this.createBuilds(data));
  }

  createBuilds(data) {
    this.title = data.name;
  	this.builds = data.builds as Build[];
  	console.log(this.builds);
  }

}
