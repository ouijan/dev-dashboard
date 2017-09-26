import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Build } from './build';

export class BuildList {
  dataChange: BehaviorSubject<Build[]> = new BehaviorSubject<Build[]>([]);
  get data(): Build[] { return this.dataChange.value; }

  add(build: Build): void {
    const copiedData = this.data.slice();
    copiedData.unshift(build);
    this.dataChange.next(copiedData);
  }

  empty(): void {
    this.dataChange.next([]);	
  }

  has(name: string): boolean {
    let existing = this.data.find((build: Build): boolean => {
      return build.buildName == name;
    });
    return existing !== undefined;
  }

}