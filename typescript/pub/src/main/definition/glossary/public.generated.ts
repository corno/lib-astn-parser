import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_h from "glo-astn-handlers"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace I {}

export namespace B {}

export namespace F {
    
    export type CreateHeaderParserErrorMessage = <GAnnotation>($: T.HeaderParserError<GAnnotation>,) => g_common.T.String
    
    export type CreateTreeParserErrorMessage = <GAnnotation>($: T.TreeParserError<GAnnotation>,) => g_common.T.String
}