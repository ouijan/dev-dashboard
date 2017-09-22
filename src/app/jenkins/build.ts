import  { JenkinsService } from './jenkins.service';
import { PollingHandler } from '../core/polling-handler';

export class Build {
	jenkins: any
	path: string
	id: number
	buildName: string
	name: string
	status: string
	startTimeMillis: Date
	durationMillis: number
	endTimeMillis: Date
	pauseDurationMillis: number
	queueDurationMillis: number
	stages: BuildStage[] = []
	_links: BuildLinks
	polling: PollingHandler;

	constructor(buildName: string, path: string, jenkins: JenkinsService) {
		this.buildName = buildName;
		this.path = path;
		this.jenkins = jenkins;
		this.polling = new PollingHandler(() => this.refresh());
	}

	setProperties(data: any): void {
		this.name = data.name;
		this.status = data.status;
		this.startTimeMillis = new Date(data.startTimeMillis);
		this.durationMillis = data.durationMillis;
		this.endTimeMillis = new Date(data.endTimeMillis);
		this.pauseDurationMillis = data.pauseDurationMillis;
		this.queueDurationMillis = data.queueDurationMillis;
		this.stages = data.stages;
		this._links = data._links;

		if (!this.isRunning()) {
			this.polling.stop();
		}
	}

	refresh() {
		this.jenkins.getBuild(this.path)
			.then(data => this.setProperties(data));
	}

	isSuccess(): boolean {
		return this.status == "SUCCESS";
	}
	
	isFailure(): boolean {
		return this.status == "FAILED";
	}

	isAborted(): boolean {
		return (this.status == "ABORTED" || this.status == "NOT_EXECUTED");
	}

	isRunning(): boolean {
		return !this.isSuccess() && !this.isFailure() && !this.isAborted();
	}

	getLastStage(): BuildStage {
		let lastIndex = this.stages.length - 1;
		return this.stages[lastIndex];
	}
}

class BuildStage {
	id: number
	name: string
	status: string
	execNode: string
	startTimeMillis: number
	durationMillis: number
	pauseDurationMillis: number
	_links: BuildStageLinks
}

class BuildLinks {
	changesets: Link
	self: Link
}

class BuildStageLinks {
	self: Link
}

class Link {
	href: string
}

