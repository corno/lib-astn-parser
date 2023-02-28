import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gthis from "./glossary"

export type CcreateHeaderParser = ($d: {}) => gthis.FCreateHeaderParser

export type CcreateHeaderParserErrorMessage = gthis.FCreateHeaderParserErrorMessage

export type CcreateTreeParser = ($d: {}) => gthis.FCreateTreeParser

export type CcreateTreeParserErrorMessage = gthis.FCreateTreeParserErrorMessage

export type API = {
    createHeaderParser: CcreateHeaderParser
    createHeaderParserErrorMessage: CcreateHeaderParserErrorMessage
    createTreeParser: CcreateTreeParser
    createTreeParserErrorMessage: CcreateTreeParserErrorMessage
}