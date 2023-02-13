import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mtc from "glo-astn-tokenconsumer"

export type FCreateHeaderParser = <GPAnnotation>($: mcommon.T.Null,) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>

export type FCreateHeaderParserErrorMessage = <GPAnnotation>($: T.HeaderParserError<GPAnnotation>,) => mcommon.T.String

export type FCreateTreeParser = <GPAnnotation>($: mcommon.T.Null,) => void

export type FCreateTreeParserErrorMessage = <GPAnnotation>($: T.TreeParserError<GPAnnotation>,) => mcommon.T.String