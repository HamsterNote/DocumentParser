import type { IntermediateDocument } from '@hamster-note/types'

// 解析器通用输入，兼容 Browser / Worker / Node（Buffer 属于 ArrayBufferView）
export type ParserInput = ArrayBuffer | ArrayBufferView | Blob

export abstract class DocumentParser {
  // 子类必须声明支持的扩展名列表（不带点），用于注册分发
  static readonly exts: readonly string[] = []

  /**
   * 将原始输入解析为中间文档结构。
   * - 输入必须是内存态数据（ArrayBuffer / ArrayBufferView / Blob）
   * - 失败时抛出异常；不要返回 undefined。
   */
  abstract encode(input: ParserInput): Promise<IntermediateDocument>

  /**
   * 可选：从中间文档逆序列化回原始文件数据。
   * 默认不支持，需要的子类自行实现。
   */
  decode(_intermediateDocument: IntermediateDocument): Promise<ParserInput> {
    return Promise.reject(new Error('decode is not implemented'))
  }

  // 将各种输入转换为 ArrayBuffer，方便子类直接消费二进制
  protected static async toArrayBuffer(
    input: ParserInput
  ): Promise<ArrayBuffer> {
    if (input instanceof ArrayBuffer) {
      return input
    }
    if (ArrayBuffer.isView(input)) {
      // 拷贝为独立的 ArrayBuffer，避免 SharedArrayBuffer 兼容性问题
      const buffer = new ArrayBuffer(input.byteLength)
      new Uint8Array(buffer).set(
        new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
      )
      return buffer
    }
    if (typeof Blob !== 'undefined' && input instanceof Blob) {
      return input.arrayBuffer()
    }
    throw new TypeError('Unsupported parser input')
  }

  // 子类若需要 Uint8Array，可直接复用
  protected static async toUint8Array(input: ParserInput): Promise<Uint8Array> {
    const buffer = await DocumentParser.toArrayBuffer(input)
    return new Uint8Array(buffer)
  }
}
