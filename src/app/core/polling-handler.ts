
export class PollingHandler {
	_callback: any;
	_handler: any;

	constructor(callback: any) {
		this._callback = callback;
	}

	stop(): void {
		if (this._handler) {
			window.clearInterval(this._handler);
		}
	}

	start(interval: number = 5000): void {
		this._handler = window.setInterval(this._callback, interval);
	}

}

