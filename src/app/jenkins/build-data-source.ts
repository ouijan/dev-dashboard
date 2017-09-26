import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';

import { Build } from './build';
import { BuildList } from './build-list';

/**
 * Data source to provide what data should be rendered in the table. The 
 * observable provided in connect should emit exactly the data that should 
 * be rendered by the table. If the data is altered, the observable should 
 * emit that new set of data on the stream. In our case here, we return a 
 * stream that contains only one set of data that doesn't change.
 */
export class BuildDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  constructor(private _builds: BuildList) {
    super();
  }

  /** 
   * Connect function called by the table to retrieve 
   * one stream containing the data to render.
   */
  connect(): Observable<Build[]> {
    const displayDataChanges = [
      this._builds.dataChange,
      this._filterChange,
    ];

    return this._builds.dataChange;
    // return Observable.merge(...displayDataChanges).map(() => {
    //   return this._builds.data.slice().filter((item: Build) => {
    //     return false;
    //   });
    // });
  }

  disconnect() {}
}