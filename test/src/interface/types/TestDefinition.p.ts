import * as pt from 'pareto-core-types'

export type TEventDefinition =
    | ['token',
        | ['simple string', string]
        | ['multiline string', string]
        | ['open array', string]
        | ['close array', null]
        | ['open object', string]
        | ['close object', null]
        | ['open tagged union', null]
        | ['line comment', string]
        | ['block comment', string]
        | ['schema data start', null]
    ]
    | ['parsingerror', {
        'message': string,
    }]
    | ['stream end', null]
    | ['instance data start', null]
    | ['validationerror', string]
    | ['tree end', null]
    | ['tagged union end', null]
    | ['missing', null]

export type TTestDefinition = {
    readonly text: string
    //readonly chunks?: pt.Array<string>
    readonly events: pt.Array<TEventDefinition>
    //readonly formattedText?: string
}

export type TTestDefinitions = pt.Dictionary<TTestDefinition>