import { API } from "./api"
import { $$ as icreateCreateHeaderParser } from "./implementations/createCreateHeaderParser.p"
import { $$ as icreateHeaderParserErrorMessage } from "./implementations/createHeaderParserErrorMessage.p"
import { $$ as icreateTreeParser } from "./implementations/createTreeParser.p"
import { $$ as icreateTreeParserErrorMessage } from "./implementations/createTreeParserErrorMessage.p"

export const $a: API = {
    'createCreateHeaderParser': icreateCreateHeaderParser,
    'createHeaderParserErrorMessage': icreateHeaderParserErrorMessage,
    'createTreeParser': icreateTreeParser,
    'createTreeParserErrorMessage': icreateTreeParserErrorMessage,
}