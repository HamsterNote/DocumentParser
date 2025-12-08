import { DocumentParser } from '@DocumentParser'

// Store constructors (classes), not instances
const parserMap: Map<string, typeof DocumentParser> = new Map()

// Register a parser class (constructor) which exposes a static `ext`
export const registerParser = (parser: typeof DocumentParser) => {
  console.log(parser.ext, parser)
  parserMap.set(parser.ext, parser)
}

export function getParser(file: File): typeof DocumentParser | undefined {
  const extension = file.name.split('.').pop()
  if (!extension) {
    return undefined
  }
  return parserMap.get(extension)
}

export function parse(file: File) {
  const Parser = getParser(file)
  console.log('Parse:', Parser)
  if (!Parser) {
    return undefined
  }
  const parser = new Parser(file)
  parser.encode().then((_doc) => {
    // window.doc1 = _doc
  })
  return parser.encode()
}
