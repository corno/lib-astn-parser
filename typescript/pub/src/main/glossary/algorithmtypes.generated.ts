import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_h from "glo-astn-handlers"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace ASYNC {
    
    export namespace I {
        
        export type HeaderParserErrorHandler<GAnnotation> = {
            'data': ($: T.AnnotatedHeaderParserError<GAnnotation>, ) => void
            'end': () => void
        }
        
        export type HeaderParserHandler<GAnnotation> = {
            readonly 'onEmbeddedSchema': ($: T.EmbeddedSchema<GAnnotation>, ) => g_tc.ASYNC.I.TokenConsumer<T.Annotation<GAnnotation>>
            readonly 'onNoInternalSchema': () => g_tc.ASYNC.I.TokenConsumer<T.Annotation<GAnnotation>>
            readonly 'onSchemaReference': ($: T.SchemaReference<GAnnotation>, ) => g_tc.ASYNC.I.TokenConsumer<T.Annotation<GAnnotation>>
        }
        
        export type TreeParserErrorHandler<GAnnotation> = {
            'data': ($: T.AnnotatedTreeParserError<GAnnotation>, ) => void
            'end': () => void
        }
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateHeaderParser<GAnnotation> = ($is: {
                readonly 'errorHandler': ASYNC.I.HeaderParserErrorHandler<GAnnotation>
                readonly 'handler': ASYNC.I.HeaderParserHandler<GAnnotation>
            }) => g_tc.ASYNC.I.TokenConsumer<T.Annotation<GAnnotation>>
        }
        
        
        export namespace C {
            export type CreateTreeParser<GAnnotation> = ($is: {
                readonly 'errorHandler': ASYNC.I.TreeParserErrorHandler<GAnnotation>
                readonly 'handler': g_h.ASYNC.I.RequiredValueHandler<T.Annotation<GAnnotation>>
            }) => g_tc.ASYNC.I.TokenConsumer<T.Annotation<GAnnotation>>
        }
    }
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type CreateHeaderParserErrorMessage<GAnnotation> = ($: T.HeaderParserError<GAnnotation>) => g_common.T.String
        }
        
        
        export namespace F {
            export type CreateTreeParserErrorMessage<GAnnotation> = ($: T.TreeParserError<GAnnotation>) => g_common.T.String
        }
    }
}