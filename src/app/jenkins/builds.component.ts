import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { PollingHandler } from '../core/polling-handler';

import { Build } from './build';
import { BuildList } from './build-list';
import { BuildDataSource } from './build-data-source';
import { JenkinsService } from './jenkins.service';

@Component({
  selector: 'jenkins-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css'],
})
export class BuildsComponent implements OnInit {
  title: string;
  builds = new BuildList();
  dataSource: BuildDataSource;
  polling: PollingHandler;
  displayedColumns = [
    'status', 
    'name', 
    'flex',
    'stage',
    // 'started',
    // 'finished',
    // 'duration',
   ];

	constructor(private jenkins: JenkinsService) { 
    this.polling = new PollingHandler(() => this.load());
  }

  ngOnInit(): void {
    this.dataSource = new BuildDataSource(this.builds);
    this.load();
    this.polling.start(15000);
  }

  load(): void {
    this.jenkins.getLiveBuildStatus()
      .then(data => this.createBuilds(data));
  }

  createBuilds(data: any): void {
    this.title = data.name;
    data.builds.reverse()
      .forEach(build => this.createBuild(build.buildName, build.url));
  }

  createBuild(name: string, path: string): void {
    if (this.builds.has(name)) {
      return;
    }

    let build = new Build(name, path, this.jenkins);
    build.refresh();
    build.polling.start(3000);

    this.builds.add(build);
  }

}

