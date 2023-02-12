import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"

export type FCreateHeaderParserErrorMessage = <GPAnnotation>($: T.HeaderParserError<GPAnnotation>,) => mcommon.T.String

export type FCreateTreeParserErrorMessage = <GPAnnotation>($: T.TreeParserError<GPAnnotation>,) => mcommon.T.String

export type FX = <GPAnnotation>($: mcommon.T.Null,) => void