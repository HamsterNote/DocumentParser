import { Number2 } from '@math'

export enum RenderViews {
  THUMBNAIL = 'thumbnail',
  TEXT = 'text'
}

export interface RenderOptions {
  views: RenderViews[]
  scale: number
}

export abstract class HamsterPage {
  abstract render(
    container: HTMLDivElement,
    options?: RenderOptions
  ): Promise<void>
  abstract getNumber(): number
  abstract getSize(scale: number): Number2
  abstract getPureText(): string
  // abstract getTextDom
}
