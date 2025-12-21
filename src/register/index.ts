import type { DocumentParser, ParserInput } from '../Parser'
import type { IntermediateDocument } from '@hamster-note/types'

export interface DocumentParserConstructor<
  T extends DocumentParser = DocumentParser
> {
  new (): T
  readonly exts: readonly string[]
}

const parserMap: Map<string, DocumentParserConstructor> = new Map()

const normalizeExt = (ext: string) => ext.replace(/^\./, '').toLowerCase()

// 注册解析器：防止重复注册同扩展名的不同类
export const registerParser = (Parser: DocumentParserConstructor) => {
  if (!Array.isArray(Parser.exts) || Parser.exts.length === 0) {
    throw new Error('Parser.exts 必须是非空数组')
  }
  Parser.exts.forEach((ext) => {
    const key = normalizeExt(ext)
    const exists = parserMap.get(key)
    if (exists && exists !== Parser) {
      throw new Error(`扩展名 ${key} 已被其他解析器占用`)
    }
    parserMap.set(key, Parser)
  })
}

export function unregisterParser(Parser: DocumentParserConstructor) {
  Parser.exts.forEach((ext) => {
    const key = normalizeExt(ext)
    const exists = parserMap.get(key)
    if (exists === Parser) {
      parserMap.delete(key)
    }
  })
}

export function getParserByExt(
  ext?: string
): DocumentParserConstructor | undefined {
  if (!ext) return undefined
  return parserMap.get(normalizeExt(ext))
}

export interface ParseOptions {
  filename?: string
  ext?: string
  parser?: DocumentParserConstructor
}

export async function parse(
  input: ParserInput,
  options: ParseOptions = {}
): Promise<IntermediateDocument> {
  const extFromName = options.filename?.split('.').pop()
  const ext = options.ext ?? extFromName
  const Parser = options.parser ?? getParserByExt(ext)

  if (!Parser) {
    throw new Error(
      `未找到匹配的解析器，扩展名: ${ext ?? '未知'}，已注册: ${[
        ...parserMap.keys()
      ].join(', ')}`
    )
  }

  const parser = new Parser()
  return parser.encode(input)
}

// 便于测试或运行时可观测性
export function listRegisteredParsers() {
  return [...parserMap.entries()].map(([ext, ctor]) => ({ ext, parser: ctor }))
}
