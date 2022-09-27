import { THeaderError } from "../types/HeaderError.p"
import { TTreeParserError } from "../types/TreeParserError.p"

export type CreateHeaderErrorMessage = ($$: THeaderError) => string


export type CreateTreeParserErrorMessage =  (error: TTreeParserError) => string