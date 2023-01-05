export class CustomError extends Error {
	status: number;

	constructor(message: any, status: number) {
		super();
		this.message = message || "Internal server error";
		this.status = status || 500;
	}

	getError() {
		return {
			message: this.message,
			status: this.status,
		};
	}
}
