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
  builds: Build[] = []
  columns: ['name', 'result'];

	constructor(private jenkins: JenkinsService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.jenkins.getLiveBuildStatus()
      .then(data => this.createBuilds(data));
  }

  createBuilds(data): void {
    this.title = data.name;
    data.builds.forEach(build => this.createBuild(build.buildName, build.url));
  }

  createBuild(name: string, path: string): void {
    this.jenkins.getBuild(path)
      .then(data => {
        data.buildName = name,
        this.builds.push(data as Build);
      });
  }

}
