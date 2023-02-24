import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as gh from "glo-astn-handlers"
import * as gtc from "glo-astn-tokenconsumer"

export type IHeaderHandler<GPAnnotation> = {
    'onEmbeddedSchema': ($: T.EmbeddedSchema<GPAnnotation>, ) => gtc.ITokenConsumer<T.Annotation<GPAnnotation>>
    'onNoInternalSchema': ($: gcommon.T.Null, ) => gtc.ITokenConsumer<T.Annotation<GPAnnotation>>
    'onSchemaReference': ($: T.SchemaReference<GPAnnotation>, ) => gtc.ITokenConsumer<T.Annotation<GPAnnotation>>
}

export type IHeaderParserHandler<GPAnnotation> = {
    'handler': IHeaderHandler<GPAnnotation>
    'onError': ($: T.AnnotatedHeaderParserError<GPAnnotation>, ) => void
}

export type ITreeParserHandler<GPAnnotation> = {
    'handler': gh.ITreeHandler<T.Annotation<GPAnnotation>>
    'onError': ($: T.AnnotatedTreeParserError<GPAnnotation>, ) => void
}

export type FCreateHeaderParser = <GPAnnotation>($: gcommon.T.Null, $i: IHeaderParserHandler<GPAnnotation>,) => gtc.ITokenConsumer<T.Annotation<GPAnnotation>>

export type FCreateHeaderParserErrorMessage = <GPAnnotation>($: T.HeaderParserError<GPAnnotation>,) => gcommon.T.String

export type FCreateTreeParser = <GPAnnotation>($: gcommon.T.Null, $i: ITreeParserHandler<GPAnnotation>,) => gtc.ITokenConsumer<T.Annotation<GPAnnotation>>

export type FCreateTreeParserErrorMessage = <GPAnnotation>($: T.TreeParserError<GPAnnotation>,) => gcommon.T.String