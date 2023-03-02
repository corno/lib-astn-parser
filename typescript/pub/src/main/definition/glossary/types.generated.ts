import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gh from "glo-astn-handlers"
import * as gtc from "glo-astn-tokenconsumer"

export namespace T {
    
    export namespace AnnotatedHeaderParserError {
        
        export type annotation<GPAnnotation> = GPAnnotation
        
        export type error<GPAnnotation> = T.HeaderParserError<GPAnnotation>
    }
    
    export type AnnotatedHeaderParserError<GPAnnotation> = {
        readonly 'annotation': GPAnnotation
        readonly 'error': T.HeaderParserError<GPAnnotation>
    }
    
    export namespace AnnotatedTreeParserError {
        
        export type annotation<GPAnnotation> = GPAnnotation
        
        export type error<GPAnnotation> = T.TreeParserError<GPAnnotation>
    }
    
    export type AnnotatedTreeParserError<GPAnnotation> = {
        readonly 'annotation': GPAnnotation
        readonly 'error': T.TreeParserError<GPAnnotation>
    }
    
    export type Annotation<GPAnnotation> = GPAnnotation
    
    export namespace EmbeddedSchema {
        
        export type embeddedSchemaAnnotation<GPAnnotation> = GPAnnotation
        
        export type headerAnnotation<GPAnnotation> = GPAnnotation
        
        export type schemaSchemaReferenceToken<GPAnnotation> = gh.T.SimpleStringToken<T.Annotation<GPAnnotation>>
    }
    
    export type EmbeddedSchema<GPAnnotation> = {
        readonly 'embeddedSchemaAnnotation': GPAnnotation
        readonly 'headerAnnotation': GPAnnotation
        readonly 'schemaSchemaReferenceToken': gh.T.SimpleStringToken<T.Annotation<GPAnnotation>>
    }
    
    export namespace HeaderParserError {
        
        export namespace expected__a__schema__reference__or__an__embedded__schema {}
        
        export type expected__a__schema__reference__or__an__embedded__schema<GPAnnotation> = {}
        
        export namespace expected__a__schema__schema__reference {}
        
        export type expected__a__schema__schema__reference<GPAnnotation> = {}
        
        export namespace expected__an__embedded__schema {}
        
        export type expected__an__embedded__schema<GPAnnotation> = {}
        
        export namespace expected__the__schema__start___po_ex_pc__or__root__value {}
        
        export type expected__the__schema__start___po_ex_pc__or__root__value<GPAnnotation> = {}
    }
    
    export type HeaderParserError<GPAnnotation> = 
        | ['expected a schema reference or an embedded schema', {}]
        | ['expected a schema schema reference', {}]
        | ['expected an embedded schema', {}]
        | ['expected the schema start (!) or root value', {}]
    
    export namespace SchemaReference {
        
        export type headerAnnotation<GPAnnotation> = GPAnnotation
        
        export type token<GPAnnotation> = gh.T.SimpleStringToken<T.Annotation<GPAnnotation>>
    }
    
    export type SchemaReference<GPAnnotation> = {
        readonly 'headerAnnotation': GPAnnotation
        readonly 'token': gh.T.SimpleStringToken<T.Annotation<GPAnnotation>>
    }
    
    export namespace TreeParserError {
        
        export namespace missing__array__close {}
        
        export type missing__array__close<GPAnnotation> = {}
        
        export namespace missing__key {}
        
        export type missing__key<GPAnnotation> = {}
        
        export namespace missing__object__close {}
        
        export type missing__object__close<GPAnnotation> = {}
        
        export namespace missing__option {}
        
        export type missing__option<GPAnnotation> = {}
        
        export namespace missing__tagged__union__option__and__value {}
        
        export type missing__tagged__union__option__and__value<GPAnnotation> = {}
        
        export namespace missing__value {}
        
        export type missing__value<GPAnnotation> = {}
        
        export namespace unexpected__data__after__end {}
        
        export type unexpected__data__after__end<GPAnnotation> = {}
        
        export namespace unexpected__end__of__array {}
        
        export type unexpected__end__of__array<GPAnnotation> = {}
        
        export namespace unexpected__end__of__object {}
        
        export type unexpected__end__of__object<GPAnnotation> = {}
        
        export namespace unexpected__end__of__text {
            
            export namespace still__in {
                
                export namespace array {}
                
                export type array<GPAnnotation> = {}
                
                export namespace _lobject {}
                
                export type _lobject<GPAnnotation> = {}
                
                export namespace tagged__union {}
                
                export type tagged__union<GPAnnotation> = {}
            }
            
            export type still__in<GPAnnotation> = 
                | ['array', {}]
                | ['object', {}]
                | ['tagged union', {}]
        }
        
        export type unexpected__end__of__text<GPAnnotation> = {
            readonly 'still in': 
                | ['array', {}]
                | ['object', {}]
                | ['tagged union', {}]
        }
        
        export namespace unexpected__header__start {}
        
        export type unexpected__header__start<GPAnnotation> = {}
    }
    
    export type TreeParserError<GPAnnotation> = 
        | ['missing array close', {}]
        | ['missing key', {}]
        | ['missing object close', {}]
        | ['missing option', {}]
        | ['missing tagged union option and value', {}]
        | ['missing value', {}]
        | ['unexpected data after end', {}]
        | ['unexpected end of array', {}]
        | ['unexpected end of object', {}]
        | ['unexpected end of text', {
            readonly 'still in': 
                | ['array', {}]
                | ['object', {}]
                | ['tagged union', {}]
        }]
        | ['unexpected header start', {}]
}