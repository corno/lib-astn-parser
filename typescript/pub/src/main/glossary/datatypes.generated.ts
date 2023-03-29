import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_h from "glo-astn-handlers"
import * as g_tc from "glo-astn-tokenconsumer"

export namespace N {}

export namespace T {
    
    export namespace AnnotatedHeaderParserError {
        
        export type annotation<GAnnotation> = GAnnotation
        
        export type error<GAnnotation> = T.HeaderParserError<GAnnotation>
    }
    
    export type AnnotatedHeaderParserError<GAnnotation> = {
        readonly 'annotation': GAnnotation
        readonly 'error': T.HeaderParserError<GAnnotation>
    }
    
    export namespace AnnotatedTreeParserError {
        
        export type annotation<GAnnotation> = GAnnotation
        
        export type error<GAnnotation> = T.TreeParserError<GAnnotation>
    }
    
    export type AnnotatedTreeParserError<GAnnotation> = {
        readonly 'annotation': GAnnotation
        readonly 'error': T.TreeParserError<GAnnotation>
    }
    
    export type Annotation<GAnnotation> = GAnnotation
    
    export namespace EmbeddedSchema {
        
        export type embeddedSchemaAnnotation<GAnnotation> = GAnnotation
        
        export type headerAnnotation<GAnnotation> = GAnnotation
        
        export type schemaSchemaReferenceToken<GAnnotation> = g_h.T.SimpleStringToken<T.Annotation<GAnnotation>>
    }
    
    export type EmbeddedSchema<GAnnotation> = {
        readonly 'embeddedSchemaAnnotation': GAnnotation
        readonly 'headerAnnotation': GAnnotation
        readonly 'schemaSchemaReferenceToken': g_h.T.SimpleStringToken<T.Annotation<GAnnotation>>
    }
    
    export namespace HeaderParserError {
        
        export namespace expected__a__schema__reference__or__an__embedded__schema {}
        
        export type expected__a__schema__reference__or__an__embedded__schema<GAnnotation> = null
        
        export namespace expected__a__schema__schema__reference {}
        
        export type expected__a__schema__schema__reference<GAnnotation> = null
        
        export namespace expected__an__embedded__schema {}
        
        export type expected__an__embedded__schema<GAnnotation> = null
        
        export namespace expected__the__schema__start___po_ex_pc__or__root__value {}
        
        export type expected__the__schema__start___po_ex_pc__or__root__value<GAnnotation> = null
    }
    
    export type HeaderParserError<GAnnotation> = 
        | ['expected a schema reference or an embedded schema', null]
        | ['expected a schema schema reference', null]
        | ['expected an embedded schema', null]
        | ['expected the schema start (!) or root value', null]
    
    export namespace SchemaReference {
        
        export type headerAnnotation<GAnnotation> = GAnnotation
        
        export type token<GAnnotation> = g_h.T.SimpleStringToken<T.Annotation<GAnnotation>>
    }
    
    export type SchemaReference<GAnnotation> = {
        readonly 'headerAnnotation': GAnnotation
        readonly 'token': g_h.T.SimpleStringToken<T.Annotation<GAnnotation>>
    }
    
    export namespace TreeParserError {
        
        export namespace missing__array__close {}
        
        export type missing__array__close<GAnnotation> = null
        
        export namespace missing__key {}
        
        export type missing__key<GAnnotation> = null
        
        export namespace missing__object__close {}
        
        export type missing__object__close<GAnnotation> = null
        
        export namespace missing__option {}
        
        export type missing__option<GAnnotation> = null
        
        export namespace missing__tagged__union__option__and__value {}
        
        export type missing__tagged__union__option__and__value<GAnnotation> = null
        
        export namespace missing__value {}
        
        export type missing__value<GAnnotation> = null
        
        export namespace unexpected__data__after__end {}
        
        export type unexpected__data__after__end<GAnnotation> = null
        
        export namespace unexpected__end__of__array {}
        
        export type unexpected__end__of__array<GAnnotation> = null
        
        export namespace unexpected__end__of__object {}
        
        export type unexpected__end__of__object<GAnnotation> = null
        
        export namespace unexpected__end__of__text {
            
            export namespace still__in {
                
                export namespace array {}
                
                export type array<GAnnotation> = null
                
                export namespace _lobject {}
                
                export type _lobject<GAnnotation> = null
                
                export namespace tagged__union {}
                
                export type tagged__union<GAnnotation> = null
            }
            
            export type still__in<GAnnotation> = 
                | ['array', null]
                | ['object', null]
                | ['tagged union', null]
        }
        
        export type unexpected__end__of__text<GAnnotation> = {
            readonly 'still in': 
                | ['array', null]
                | ['object', null]
                | ['tagged union', null]
        }
        
        export namespace unexpected__header__start {}
        
        export type unexpected__header__start<GAnnotation> = null
    }
    
    export type TreeParserError<GAnnotation> = 
        | ['missing array close', null]
        | ['missing key', null]
        | ['missing object close', null]
        | ['missing option', null]
        | ['missing tagged union option and value', null]
        | ['missing value', null]
        | ['unexpected data after end', null]
        | ['unexpected end of array', null]
        | ['unexpected end of object', null]
        | ['unexpected end of text', {
            readonly 'still in': 
                | ['array', null]
                | ['object', null]
                | ['tagged union', null]
        }]
        | ['unexpected header start', null]
}