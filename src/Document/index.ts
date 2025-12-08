import { HamsterPage } from '@DocumentParser'
import { DocumentAnchor } from '@DocumentParser'

export abstract class HamsterDocument {
  // 获取 Page 对象列表
  abstract getPages(): Promise<HamsterPage[]>
  // 获取 Page 对象
  abstract getPage(pageNumber: number): Promise<HamsterPage | undefined>
  // 获取大纲（PDF如果有内置的话）
  abstract getOutline(): Promise<
    | {
        title: string
        anchor?: DocumentAnchor
      }
    | undefined
  >
  // 获取封面
  abstract getCover(): Promise<HTMLCanvasElement | HTMLImageElement>
}
