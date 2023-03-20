import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export namespace A {
    
    export type createHeaderParser = <GAnnotation>() => g_this.ASYNC.A.C.CreateHeaderParser<GAnnotation>
    
    export type createHeaderParserErrorMessage = <GAnnotation>() => g_this.SYNC.A.F.CreateHeaderParserErrorMessage<GAnnotation>
    
    export type createTreeParser = <GAnnotation>() => g_this.ASYNC.A.C.CreateTreeParser<GAnnotation>
    
    export type createTreeParserErrorMessage = <GAnnotation>() => g_this.SYNC.A.F.CreateTreeParserErrorMessage<GAnnotation>
}

export type API = {
    readonly 'createHeaderParser': A.createHeaderParser
    readonly 'createHeaderParserErrorMessage': A.createHeaderParserErrorMessage
    readonly 'createTreeParser': A.createTreeParser
    readonly 'createTreeParserErrorMessage': A.createTreeParserErrorMessage
}