import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as gcommon from "glo-pareto-common"

export type CcreateHeaderParser = ($d: {}) => gglo.FCreateHeaderParser

export type CcreateHeaderParserErrorMessage = gglo.FCreateHeaderParserErrorMessage

export type CcreateTreeParser = ($d: {}) => gglo.FCreateTreeParser

export type CcreateTreeParserErrorMessage = gglo.FCreateTreeParserErrorMessage

export type API = {
    createHeaderParser: CcreateHeaderParser
    createHeaderParserErrorMessage: CcreateHeaderParserErrorMessage
    createTreeParser: CcreateTreeParser
    createTreeParserErrorMessage: CcreateTreeParserErrorMessage
}