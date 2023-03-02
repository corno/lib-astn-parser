import { API } from "./definition/api.generated"
import { $$ as icreateHeaderParser } from "./implementations/createHeaderParser.p"
import { $$ as icreateHeaderParserErrorMessage } from "./implementations/createHeaderParserErrorMessage.p"
import { $$ as icreateTreeParser } from "./implementations/createTreeParser.p"
import { $$ as icreateTreeParserErrorMessage } from "./implementations/createTreeParserErrorMessage.p"

export const $a: API = {
    'createHeaderParser': icreateHeaderParser,
    'createHeaderParserErrorMessage': icreateHeaderParserErrorMessage,
    'createTreeParser': icreateTreeParser,
    'createTreeParserErrorMessage': icreateTreeParserErrorMessage,
}