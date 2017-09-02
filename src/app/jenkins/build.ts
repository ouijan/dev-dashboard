export class Build {
	id: number
	buildName: string
	name: string
	status: string
	startTimeMillis: number
	durationMillis: number
	endTimeMillis: number
	pauseDurationMillis: number
	queueDurationMillis: number
	stages: BuildStage[]
	_links: BuildLinks
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

