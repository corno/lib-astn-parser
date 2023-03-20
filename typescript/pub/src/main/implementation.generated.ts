import { API } from "./api.generated"
import { $$ as icreateHeaderParser } from "./implementations/createHeaderParser.a.c"
import { $$ as icreateHeaderParserErrorMessage } from "./implementations/createHeaderParserErrorMessage.s.f"
import { $$ as icreateTreeParser } from "./implementations/createTreeParser.a.c"
import { $$ as icreateTreeParserErrorMessage } from "./implementations/createTreeParserErrorMessage.s.f"

export const $api: API = {
    'createHeaderParser': icreateHeaderParser,
    'createHeaderParserErrorMessage': icreateHeaderParserErrorMessage,
    'createTreeParser': icreateTreeParser,
    'createTreeParserErrorMessage': icreateTreeParserErrorMessage,
}