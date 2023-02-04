import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"

export type THeaderParserError = t.UHeaderParserError

export type TTreeParserError = t.UTreeParserError

export type FCreateHeaderParserErrorMessage = ($: THeaderParserError,) => mcommon.TString

export type FCreateTreeParserErrorMessage = ($: TTreeParserError,) => mcommon.TString

export type FX = ($: mcommon.TNull,) => void