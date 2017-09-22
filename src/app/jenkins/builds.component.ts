import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

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
  displayedColumns = [
    'status', 
    'name', 
    'flex',
    'stage',
    // 'started',
    // 'finished',
    // 'duration',
   ];

	constructor(private jenkins: JenkinsService) { }

  ngOnInit(): void {
    this.dataSource = new BuildDataSource(this.builds);
    this.load();
    this.startPolling()
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
    if (this.builds.has(name)) {
      return;
    }

    let build = new Build(name, path, this.jenkins);
    build.refresh();
    build.startPolling(3000);
    this.builds.add(build);
  }


  startPolling(interval: number = 15000): void {
    window.setInterval(() => this.load(), interval);
  }

}

