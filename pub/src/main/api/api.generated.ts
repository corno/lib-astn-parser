import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"

export type CcreateHeaderParser = ($d: {}) => glo.FCreateHeaderParser

export type CcreateHeaderParserErrorMessage = glo.FCreateHeaderParserErrorMessage

export type CcreateTreeParser = ($d: {}) => glo.FCreateTreeParser

export type CcreateTreeParserErrorMessage = glo.FCreateTreeParserErrorMessage

export type API = {
    createHeaderParser: CcreateHeaderParser
    createHeaderParserErrorMessage: CcreateHeaderParserErrorMessage
    createTreeParser: CcreateTreeParser
    createTreeParserErrorMessage: CcreateTreeParserErrorMessage
}