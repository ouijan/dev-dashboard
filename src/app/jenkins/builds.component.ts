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
  loadInterval: number = 15;
  progress: number = 0;
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
    let repeatInterval = this.loadInterval * 1000;
    setInterval(() => this.load(), repeatInterval);
    setInterval(() => this.progress += 0.05, 50);
  }

  load(): void {
    console.log('reloading');
    
    this.jenkins.getLiveBuildStatus()
      .then(data => {
        this.createBuilds(data);
        this.progress = 0;
      });
  }

  getProgress() {
    return this.progress / this.loadInterval * 100;
  }

  createBuilds(data): void {
    this.title = data.name;
    this.builds.empty();
    data.builds.forEach(build => this.createBuild(build.buildName, build.url));
  }

  createBuild(name: string, path: string): void {
    this.jenkins.getBuild(path)
      .then(data => {
        let build = new Build(name, data);
        this.builds.add(build);
      });
  }

}

