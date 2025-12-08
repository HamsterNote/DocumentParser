import { IntermediateDocument } from '@src/types/common/HamsterDocument'

export class DocumentParser {
  static ext: string
  protected arrayBuffer: Promise<ArrayBuffer> | undefined
  constructor(file: File | ArrayBuffer) {
    if (file instanceof File) {
      this.load(file)
    } else {
      this.arrayBuffer = Promise.resolve(file)
    }
  }
  async load(file: File): Promise<void> {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    this.arrayBuffer = new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer)
      }
      reader.onerror = (err) => {
        reject(err)
      }
    })
  }
  encode(): Promise<IntermediateDocument | undefined> {
    return Promise.resolve(undefined)
  }
  decode(
    _intermediateDocument: IntermediateDocument
  ): Promise<File | ArrayBuffer | undefined> {
    return Promise.resolve(undefined)
  }
}
