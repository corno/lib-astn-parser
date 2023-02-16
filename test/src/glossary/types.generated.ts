import * as pt from 'pareto-core-types'


export namespace T {
    
    export namespace TestData {
        
        export namespace D {
            
            export namespace definitions {
                
                export namespace D {
                    
                    export namespace events {
                        
                        export namespace A {
                            
                            export namespace instance__data__start {}
                            
                            export type instance__data__start = {}
                            
                            export namespace missing {}
                            
                            export type missing = {}
                            
                            export namespace parsingerror {
                                
                                export type message = string
                            }
                            
                            export type parsingerror = {
                                readonly 'message': string
                            }
                            
                            export namespace stream__end {}
                            
                            export type stream__end = {}
                            
                            export namespace tagged__union__end {}
                            
                            export type tagged__union__end = {}
                            
                            export namespace token {
                                
                                export type block__comment = string
                                
                                export namespace close__array {}
                                
                                export type close__array = {}
                                
                                export namespace close__object {}
                                
                                export type close__object = {}
                                
                                export type line__comment = string
                                
                                export type multiline__string = string
                                
                                export type open__array = string
                                
                                export type open__object = string
                                
                                export namespace open__tagged__union {}
                                
                                export type open__tagged__union = {}
                                
                                export namespace schema__data__start {}
                                
                                export type schema__data__start = {}
                                
                                export type simple__string = string
                            }
                            
                            export type token = 
                                | ['block comment', string]
                                | ['close array', {}]
                                | ['close object', {}]
                                | ['line comment', string]
                                | ['multiline string', string]
                                | ['open array', string]
                                | ['open object', string]
                                | ['open tagged union', {}]
                                | ['schema data start', {}]
                                | ['simple string', string]
                            
                            export namespace tree__end {}
                            
                            export type tree__end = {}
                            
                            export type valdidationerror = string
                        }
                        
                        export type A = 
                            | ['instance data start', {}]
                            | ['missing', {}]
                            | ['parsingerror', {
                                readonly 'message': string
                            }]
                            | ['stream end', {}]
                            | ['tagged union end', {}]
                            | ['token', 
                                | ['block comment', string]
                                | ['close array', {}]
                                | ['close object', {}]
                                | ['line comment', string]
                                | ['multiline string', string]
                                | ['open array', string]
                                | ['open object', string]
                                | ['open tagged union', {}]
                                | ['schema data start', {}]
                                | ['simple string', string]
                            ]
                            | ['tree end', {}]
                            | ['valdidationerror', string]
                    }
                    
                    export type events = pt.Array<
                        | ['instance data start', {}]
                        | ['missing', {}]
                        | ['parsingerror', {
                            readonly 'message': string
                        }]
                        | ['stream end', {}]
                        | ['tagged union end', {}]
                        | ['token', 
                            | ['block comment', string]
                            | ['close array', {}]
                            | ['close object', {}]
                            | ['line comment', string]
                            | ['multiline string', string]
                            | ['open array', string]
                            | ['open object', string]
                            | ['open tagged union', {}]
                            | ['schema data start', {}]
                            | ['simple string', string]
                        ]
                        | ['tree end', {}]
                        | ['valdidationerror', string]
                    >
                    
                    export type text = string
                }
                
                export type D = {
                    readonly 'events': pt.Array<
                        | ['instance data start', {}]
                        | ['missing', {}]
                        | ['parsingerror', {
                            readonly 'message': string
                        }]
                        | ['stream end', {}]
                        | ['tagged union end', {}]
                        | ['token', 
                            | ['block comment', string]
                            | ['close array', {}]
                            | ['close object', {}]
                            | ['line comment', string]
                            | ['multiline string', string]
                            | ['open array', string]
                            | ['open object', string]
                            | ['open tagged union', {}]
                            | ['schema data start', {}]
                            | ['simple string', string]
                        ]
                        | ['tree end', {}]
                        | ['valdidationerror', string]
                    >
                    readonly 'text': string
                }
            }
            
            export type definitions = pt.Dictionary<{
                readonly 'events': pt.Array<
                    | ['instance data start', {}]
                    | ['missing', {}]
                    | ['parsingerror', {
                        readonly 'message': string
                    }]
                    | ['stream end', {}]
                    | ['tagged union end', {}]
                    | ['token', 
                        | ['block comment', string]
                        | ['close array', {}]
                        | ['close object', {}]
                        | ['line comment', string]
                        | ['multiline string', string]
                        | ['open array', string]
                        | ['open object', string]
                        | ['open tagged union', {}]
                        | ['schema data start', {}]
                        | ['simple string', string]
                    ]
                    | ['tree end', {}]
                    | ['valdidationerror', string]
                >
                readonly 'text': string
            }>
            
            export namespace _ltype {
                
                export namespace astn {}
                
                export type astn = {}
                
                export namespace json {}
                
                export type json = {}
            }
            
            export type _ltype = 
                | ['astn', {}]
                | ['json', {}]
        }
        
        export type D = {
            readonly 'definitions': pt.Dictionary<{
                readonly 'events': pt.Array<
                    | ['instance data start', {}]
                    | ['missing', {}]
                    | ['parsingerror', {
                        readonly 'message': string
                    }]
                    | ['stream end', {}]
                    | ['tagged union end', {}]
                    | ['token', 
                        | ['block comment', string]
                        | ['close array', {}]
                        | ['close object', {}]
                        | ['line comment', string]
                        | ['multiline string', string]
                        | ['open array', string]
                        | ['open object', string]
                        | ['open tagged union', {}]
                        | ['schema data start', {}]
                        | ['simple string', string]
                    ]
                    | ['tree end', {}]
                    | ['valdidationerror', string]
                >
                readonly 'text': string
            }>
            readonly 'type': 
                | ['astn', {}]
                | ['json', {}]
        }
    }
    
    export type TestData = pt.Dictionary<{
        readonly 'definitions': pt.Dictionary<{
            readonly 'events': pt.Array<
                | ['instance data start', {}]
                | ['missing', {}]
                | ['parsingerror', {
                    readonly 'message': string
                }]
                | ['stream end', {}]
                | ['tagged union end', {}]
                | ['token', 
                    | ['block comment', string]
                    | ['close array', {}]
                    | ['close object', {}]
                    | ['line comment', string]
                    | ['multiline string', string]
                    | ['open array', string]
                    | ['open object', string]
                    | ['open tagged union', {}]
                    | ['schema data start', {}]
                    | ['simple string', string]
                ]
                | ['tree end', {}]
                | ['valdidationerror', string]
            >
            readonly 'text': string
        }>
        readonly 'type': 
            | ['astn', {}]
            | ['json', {}]
    }>
}