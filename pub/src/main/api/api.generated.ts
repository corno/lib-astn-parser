import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"

export type CcreateCreateHeaderParser = glo.FX

export type CcreateHeaderParserErrorMessage = glo.FCreateHeaderParserErrorMessage

export type CcreateTreeParser = glo.FX

export type CcreateTreeParserErrorMessage = glo.FCreateTreeParserErrorMessage

export type API = {
    createCreateHeaderParser: CcreateCreateHeaderParser
    createHeaderParserErrorMessage: CcreateHeaderParserErrorMessage
    createTreeParser: CcreateTreeParser
    createTreeParserErrorMessage: CcreateTreeParserErrorMessage
}