import { HamsterDocument } from '../Document'
import { IntermediateDocument } from '@hamster-note/types'

export class DocumentParser {
  static readonly ext: string
  // Base static methods to be overridden by concrete parsers
  static async encode(
    _file: File | ArrayBuffer
  ): Promise<IntermediateDocument | HamsterDocument | undefined> {
    return Promise.resolve(undefined)
  }
  static async decode(
    _intermediateDocument: IntermediateDocument
  ): Promise<File | ArrayBuffer | undefined> {
    return Promise.resolve(undefined)
  }
  protected static async toArrayBuffer(
    fileOrBuffer: File | ArrayBuffer
  ): Promise<ArrayBuffer> {
    if (fileOrBuffer instanceof ArrayBuffer) return fileOrBuffer
    return await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(fileOrBuffer)
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = (e) => reject(e)
    })
  }
}
