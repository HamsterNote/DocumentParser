import { Number2 } from '@math';

export enum RenderViews {
	THUMBNAIL = 'thumbnail',
	TEXT = 'text',
}

interface RenderOptions {
	views: RenderViews[]
}

export abstract class HamsterPage {
	abstract render(container: HTMLDivElement, options?: RenderOptions): Promise<void>;
	abstract getNumber(): number;
	abstract getSize(): Number2;
	abstract getPureText(): string;
}
