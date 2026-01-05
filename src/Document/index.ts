import { HamsterPage } from '../Page'
import { IntermediateOutline } from '@hamster-note/types'

export abstract class HamsterDocument {
  abstract getPages(): Promise<HamsterPage[]>
  abstract getPage(pageNumber: number): Promise<HamsterPage | undefined>
  abstract getOutline(): Promise<IntermediateOutline | undefined>
  abstract getCover(): Promise<HTMLCanvasElement | HTMLImageElement>
}
