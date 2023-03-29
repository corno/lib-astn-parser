import * as pt from 'pareto-core-types'


export namespace N {}

export namespace T {
    
    export namespace TestData {
        
        export namespace D {
            
            export namespace definitions {
                
                export namespace D {
                    
                    export namespace events {
                        
                        export namespace A {
                            
                            export namespace instance__data__start {}
                            
                            export type instance__data__start = null
                            
                            export namespace missing {}
                            
                            export type missing = null
                            
                            export namespace parsingerror {
                                
                                export type message = string
                            }
                            
                            export type parsingerror = {
                                readonly 'message': string
                            }
                            
                            export namespace stream__end {}
                            
                            export type stream__end = null
                            
                            export namespace tagged__union__end {}
                            
                            export type tagged__union__end = null
                            
                            export namespace token {
                                
                                export type block__comment = string
                                
                                export namespace close__array {}
                                
                                export type close__array = null
                                
                                export namespace close__object {}
                                
                                export type close__object = null
                                
                                export type line__comment = string
                                
                                export type multiline__string = string
                                
                                export type open__array = string
                                
                                export type open__object = string
                                
                                export namespace open__tagged__union {}
                                
                                export type open__tagged__union = null
                                
                                export namespace schema__data__start {}
                                
                                export type schema__data__start = null
                                
                                export type simple__string = string
                            }
                            
                            export type token = 
                                | ['block comment', string]
                                | ['close array', null]
                                | ['close object', null]
                                | ['line comment', string]
                                | ['multiline string', string]
                                | ['open array', string]
                                | ['open object', string]
                                | ['open tagged union', null]
                                | ['schema data start', null]
                                | ['simple string', string]
                            
                            export namespace tree__end {}
                            
                            export type tree__end = null
                            
                            export type valdidationerror = string
                        }
                        
                        export type A = 
                            | ['instance data start', null]
                            | ['missing', null]
                            | ['parsingerror', {
                                readonly 'message': string
                            }]
                            | ['stream end', null]
                            | ['tagged union end', null]
                            | ['token', 
                                | ['block comment', string]
                                | ['close array', null]
                                | ['close object', null]
                                | ['line comment', string]
                                | ['multiline string', string]
                                | ['open array', string]
                                | ['open object', string]
                                | ['open tagged union', null]
                                | ['schema data start', null]
                                | ['simple string', string]
                            ]
                            | ['tree end', null]
                            | ['valdidationerror', string]
                    }
                    
                    export type events = pt.Array<
                        | ['instance data start', null]
                        | ['missing', null]
                        | ['parsingerror', {
                            readonly 'message': string
                        }]
                        | ['stream end', null]
                        | ['tagged union end', null]
                        | ['token', 
                            | ['block comment', string]
                            | ['close array', null]
                            | ['close object', null]
                            | ['line comment', string]
                            | ['multiline string', string]
                            | ['open array', string]
                            | ['open object', string]
                            | ['open tagged union', null]
                            | ['schema data start', null]
                            | ['simple string', string]
                        ]
                        | ['tree end', null]
                        | ['valdidationerror', string]
                    >
                    
                    export type text = string
                }
                
                export type D = {
                    readonly 'events': pt.Array<
                        | ['instance data start', null]
                        | ['missing', null]
                        | ['parsingerror', {
                            readonly 'message': string
                        }]
                        | ['stream end', null]
                        | ['tagged union end', null]
                        | ['token', 
                            | ['block comment', string]
                            | ['close array', null]
                            | ['close object', null]
                            | ['line comment', string]
                            | ['multiline string', string]
                            | ['open array', string]
                            | ['open object', string]
                            | ['open tagged union', null]
                            | ['schema data start', null]
                            | ['simple string', string]
                        ]
                        | ['tree end', null]
                        | ['valdidationerror', string]
                    >
                    readonly 'text': string
                }
            }
            
            export type definitions = pt.Dictionary<{
                readonly 'events': pt.Array<
                    | ['instance data start', null]
                    | ['missing', null]
                    | ['parsingerror', {
                        readonly 'message': string
                    }]
                    | ['stream end', null]
                    | ['tagged union end', null]
                    | ['token', 
                        | ['block comment', string]
                        | ['close array', null]
                        | ['close object', null]
                        | ['line comment', string]
                        | ['multiline string', string]
                        | ['open array', string]
                        | ['open object', string]
                        | ['open tagged union', null]
                        | ['schema data start', null]
                        | ['simple string', string]
                    ]
                    | ['tree end', null]
                    | ['valdidationerror', string]
                >
                readonly 'text': string
            }>
            
            export namespace _ltype {
                
                export namespace astn {}
                
                export type astn = null
                
                export namespace json {}
                
                export type json = null
            }
            
            export type _ltype = 
                | ['astn', null]
                | ['json', null]
        }
        
        export type D = {
            readonly 'definitions': pt.Dictionary<{
                readonly 'events': pt.Array<
                    | ['instance data start', null]
                    | ['missing', null]
                    | ['parsingerror', {
                        readonly 'message': string
                    }]
                    | ['stream end', null]
                    | ['tagged union end', null]
                    | ['token', 
                        | ['block comment', string]
                        | ['close array', null]
                        | ['close object', null]
                        | ['line comment', string]
                        | ['multiline string', string]
                        | ['open array', string]
                        | ['open object', string]
                        | ['open tagged union', null]
                        | ['schema data start', null]
                        | ['simple string', string]
                    ]
                    | ['tree end', null]
                    | ['valdidationerror', string]
                >
                readonly 'text': string
            }>
            readonly 'type': 
                | ['astn', null]
                | ['json', null]
        }
    }
    
    export type TestData = pt.Dictionary<{
        readonly 'definitions': pt.Dictionary<{
            readonly 'events': pt.Array<
                | ['instance data start', null]
                | ['missing', null]
                | ['parsingerror', {
                    readonly 'message': string
                }]
                | ['stream end', null]
                | ['tagged union end', null]
                | ['token', 
                    | ['block comment', string]
                    | ['close array', null]
                    | ['close object', null]
                    | ['line comment', string]
                    | ['multiline string', string]
                    | ['open array', string]
                    | ['open object', string]
                    | ['open tagged union', null]
                    | ['schema data start', null]
                    | ['simple string', string]
                ]
                | ['tree end', null]
                | ['valdidationerror', string]
            >
            readonly 'text': string
        }>
        readonly 'type': 
            | ['astn', null]
            | ['json', null]
    }>
}