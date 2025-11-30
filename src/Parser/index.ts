import { HamsterDocument } from '@DocumentParser';

export class DocumentParser {
	static ext: string;
	protected arrayBuffer: Promise<ArrayBuffer> | undefined;
	constructor(private file: File) {
		this.load(file);
	}
	async load(file: File): Promise<void> {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		this.arrayBuffer = new Promise((resolve, reject) => {
			reader.onload = () => {
				resolve(reader.result as ArrayBuffer);
			};
			reader.onerror = err => { reject(err) }
		});
	}
	parse(): Promise<HamsterDocument | undefined> {
		return Promise.resolve(undefined)
	}
}
