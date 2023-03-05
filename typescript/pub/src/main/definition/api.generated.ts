import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export type createHeaderParser = ($d: {}) => g_this.F.CreateHeaderParser

export type createHeaderParserErrorMessage = g_this.F.CreateHeaderParserErrorMessage

export type createTreeParser = ($d: {}) => g_this.F.CreateTreeParser

export type createTreeParserErrorMessage = g_this.F.CreateTreeParserErrorMessage

export type API = {
    createHeaderParser: createHeaderParser
    createHeaderParserErrorMessage: createHeaderParserErrorMessage
    createTreeParser: createTreeParser
    createTreeParserErrorMessage: createTreeParserErrorMessage
}