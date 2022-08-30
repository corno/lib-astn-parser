
import { createCreateHeaderParser, createCreateHeaderParserWithSerializedError } from "./imp/createCreateHeaderParser"
import { createCreateTreeParser, createCreateTreeParserWithSerializedError } from "./imp/createTreeParser"
import { createHeaderErrorMessage } from "./imp/createHeaderErrorMessage"
import { createTreeParserErrorMessage } from "./imp/createTreeParserErrorMessage"
import * as inf from "../interface"

// type API = {
//     createCreateHeaderParser: inf.CreateCreateHeaderParser
//     createCreateTreeParser: inf.CreateCreateTreeParser
//     createCreateHeaderParserWithSerializedError: inf.CreateCreateHeaderParserWithSerializedError
//     createCreateTreeParserWithSerializedError: inf.CreateCreateTreeParserWithSerializedError
//     createHeaderErrorMessage: inf.CreateHeaderErrorMessage
//     createTreeParserErrorMessage: inf.CreateTreeParserErrorMessage
// }

export const $: API = {
        createCreateHeaderParser: createCreateHeaderParser,
        createCreateTreeParser: createCreateTreeParser,
        createHeaderErrorMessage: createHeaderErrorMessage,
        createTreeParserErrorMessage: createTreeParserErrorMessage,
        createCreateHeaderParserWithSerializedError: createCreateHeaderParserWithSerializedError,
        createCreateTreeParserWithSerializedError: createCreateTreeParserWithSerializedError,
}