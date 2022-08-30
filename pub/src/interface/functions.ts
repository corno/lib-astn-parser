import { HeaderError } from "./types/HeaderError"
import { TreeParserError } from "./types/TreeParserError"

export type CreateHeaderErrorMessage = ($$: HeaderError) => string


export type CreateTreeParserErrorMessage =  (error: TreeParserError) => string