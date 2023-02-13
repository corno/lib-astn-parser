import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mh from "glo-astn-handlers"
import * as mtc from "glo-astn-tokenconsumer"

export type IHeaderHandler<GPAnnotation> = {
    'onEmbeddedSchema': ($: T.EmbeddedSchema<GPAnnotation>, ) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>
    'onNoInternalSchema': ($: mcommon.T.Null, ) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>
    'onSchemaReference': ($: T.SchemaReference<GPAnnotation>, ) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>
}

export type IHeaderParserHandler<GPAnnotation> = {
    'handler': IHeaderHandler<GPAnnotation>
    'onError': ($: T.AnnotatedHeaderParserError<GPAnnotation>, ) => void
}

export type ITreeParserHandler<GPAnnotation> = {
    'handler': mh.ITreeHandler<T.Annotation<GPAnnotation>>
    'onError': ($: T.AnnotatedTreeParserError<GPAnnotation>, ) => void
}

export type FCreateHeaderParser = <GPAnnotation>($: mcommon.T.Null, $i: IHeaderParserHandler<GPAnnotation>,) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>

export type FCreateHeaderParserErrorMessage = <GPAnnotation>($: T.HeaderParserError<GPAnnotation>,) => mcommon.T.String

export type FCreateTreeParser = <GPAnnotation>($: mcommon.T.Null, $i: ITreeParserHandler<GPAnnotation>,) => mtc.ITokenConsumer<T.Annotation<GPAnnotation>>

export type FCreateTreeParserErrorMessage = <GPAnnotation>($: T.TreeParserError<GPAnnotation>,) => mcommon.T.String