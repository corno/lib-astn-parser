import * as pr from 'pareto-core-raw'

import * as t from "./index"

export function parsingerror(message: string): t.TEventDefinition {
    return ['parsingerror', {
        'message': message,
    }]
}
export function missing(): t.TEventDefinition {
    return ['missing', null]
}
export function taggedUnionEnd(): t.TEventDefinition {
    return ['tagged union end', null]
}
export function openTaggedUnion(): t.TEventDefinition {
    return ['token', ['open tagged union', null]]
}
export function streamEnd(): t.TEventDefinition {
    return ['stream end', null]
}
export function treeEnd(): t.TEventDefinition {
    return ['tree end', null]
}
export function openAngleBracket(): t.TEventDefinition {
    return ['token', ['open array', "<"]]
}
export function schemaDataStart(): t.TEventDefinition {
    return ['token', ['schema data start', null]]
}
export function openParen(): t.TEventDefinition {
    return ['token', ['open object', "{"]]
}
export function openCurly(): t.TEventDefinition {
    return ['token', ['open object', "{",]]
}
export function simpleString(str: string): t.TEventDefinition {
    return ['token', ['simple string', str]]
}
export function multilineString(str: string): t.TEventDefinition {
    return ['token', ['multiline string', str]]
}
export function openBrace(): t.TEventDefinition {
    return ['token', ['open array', "["]]
}
export function closeObject(): t.TEventDefinition {
    return ['token', ['close object', null]]
}
export function closeArray(): t.TEventDefinition {
    return ['token', ['close array', null]]
}
export function instanceDataStart(): t.TEventDefinition {
    return ['instance data start', null]
}
export function test(input: string, events: t.TEventDefinition[]): t.TTestDefinition {
    return {
        'text': input,
        'events': pr.wrapRawArray(events)
    }

}