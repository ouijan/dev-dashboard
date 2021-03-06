import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JenkinsService {
  jenkinsUrl = 'http://jenkins.k8s.dev.digitalpacific.com.au';

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
  	return Promise.reject(error.message || error);
	}

  getLiveBuildStatus(): Promise<any> {
    const url = `${this.jenkinsUrl}/view/Live%20Build%20Status/api/json`;
    // const url = `/assets/builds.json`;
 		return this.http.get(url)
 			.toPromise()
  		.then(response => response.json())
    	.catch(this.handleError);
  }

  getBuild(path: string) {
    const url = `${this.jenkinsUrl}/${path}/wfapi/describe`;
    // const url = `/assets/build.json`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  
}