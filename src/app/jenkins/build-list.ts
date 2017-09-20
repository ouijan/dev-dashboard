import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { Build } from './build';

export class BuildList {
  dataChange: BehaviorSubject<Build[]> = new BehaviorSubject<Build[]>([]);
  get data(): Build[] { return this.dataChange.value; }

  add(build: Build): void {
    const copiedData = this.data.slice();
    copiedData.push(build);
    // copiedData.sort((a, b) => {
    //   if (a.startTimeMillis > b.startTimeMillis) return -1;
    //   if (a.startTimeMillis < b.startTimeMillis) return 1;
    //   return 0;
    // });
    this.dataChange.next(copiedData);
  }

  empty(): void {
    this.dataChange.next([]);	
  }
}