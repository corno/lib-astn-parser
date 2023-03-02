import * as pr from 'pareto-core-data'

import * as t from "./glossary"

export function parsingerror(message: string): t.T.TestData.D.definitions.D.events.A {
    return ['parsingerror', {
        'message': message,
    }]
}
export function missing(): t.T.TestData.D.definitions.D.events.A {
    return ['missing', null]
}
export function taggedUnionEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['tagged union end', null]
}
export function openTaggedUnion(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open tagged union', null]]
}
export function streamEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['stream end', null]
}
export function treeEnd(): t.T.TestData.D.definitions.D.events.A {
    return ['tree end', null]
}
export function openAngleBracket(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['open array', "<"]]
}
export function schemaDataStart(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['schema data start', null]]
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
    return ['token', ['close object', null]]
}
export function closeArray(): t.T.TestData.D.definitions.D.events.A {
    return ['token', ['close array', null]]
}
export function instanceDataStart(): t.T.TestData.D.definitions.D.events.A {
    return ['instance data start', null]
}
export function test(input: string, events: t.T.TestData.D.definitions.D.events.A[]): t.T.TestData.D.definitions.D {
    return {
        'text': input,
        'events': pr.a(events)
    }

}