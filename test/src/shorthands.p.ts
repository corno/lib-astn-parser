import * as pr from 'pareto-core-raw'

import * as t from "./glossary"

export function parsingerror(message: string): t.T.TestData.D.definitions.D.events.A {
    return ['parsingerror', {
        'message': message,
    }]
}
export function missing(): t.T.TestData.D.definitions.D.events.A {
    return ['missing', {}]
}
export function taggedUnionEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['tagged union end', {}]
}
export function openTaggedUnion(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open tagged union', {}]]
}
export function streamEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['stream end', {}]
}
export function treeEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['tree end', {}]
}
export function openAngleBracket(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open array', "<"]]
}
export function schemaDataStart(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['schema data start', {}]]
}
export function openParen(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open object', "{"]]
}
export function openCurly(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open object', "{",]]
}
export function simpleString(str: string): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['simple string', str]]
}
export function multilineString(str: string): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['multiline string', str]]
}
export function openBrace(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open array', "["]]
}
export function closeObject(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['close object', {}]]
}
export function closeArray(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['close array', {}]]
}
export function instanceDataStart(): t.T.TestData.D.definitions.D.events.A {
    return ['instance data start', {}]
}
export function test(input: string, events: t.T.TestData.D.definitions.D.events.A[]): t.T.TestData.D.definitions.D {
    return {
        'text': input,
        'events': pr.wrapRawArray(events)
    }

}