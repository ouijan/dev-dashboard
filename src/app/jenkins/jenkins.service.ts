import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JenkinsService {
	jenkinsPath = '/view/Live%20Build%20Status/api/json';
  jenkinsUrl = 'http://jenkins.k8s.dev.digitalpacific.com.au';

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error);
  	return Promise.reject(error.message || error);
	}

  getLiveBuildStatus(): Promise<any> {
  	// const url = this.jenkinsUrl + this.jenkinsPath;
  	const url = '/assets/mock.json';
 		return this.http.get(url)
 			.toPromise()
  		.then(response => response.json())
    	.catch(this.handleError);
  }
  
}