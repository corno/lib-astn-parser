import * as pr from 'pareto-core-raw'

import * as api from "../glossary"
import {
    multilineString,
    openTaggedUnion,
    openAngleBracket,
    schemaDataStart,
    simpleString,
    openCurly,
    openBrace,
    closeArray,
    closeObject,
    instanceDataStart,
    missing,
    parsingerror,
    streamEnd,
    taggedUnionEnd,
    test,
    treeEnd,
} from "../shorthands"

const d = pr.wrapRawDictionary

export const $: api.T.TestData.D.definitions = d({
    "unexpected data after end": test(
        `"foo" "bar"`,
        [
            simpleString("foo"),
            treeEnd(),
            parsingerror("unexpected data after end"),
            streamEnd(),
            // treeEnd(),
            // streamEnd(),
        ],
    ),
    "multiline string": test(
        `{ "foo": \`bar\` }`,
        [
            openCurly(),
            simpleString("foo"),
            multilineString("bar"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "trailing comma": test(
        `[ 1, 2, ]`,
        [
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    // "missing option": test(
    //     text: '| { }',
    //     events: [
    //         openTaggedUnion(),
    //         openCurly(),
    //         closeObject(),
    //         parsingerror("missing option"),
    //         treeEnd(), 
    //         streamEnd(),
    //         parsingerror("unexpected end of text, still in tagged union"),
    //     ],
    // },
    "line comment": test(
        `[ 1, "a" //a line comment\r\n]`,
        //formattedText: '[ 1, "a" //a line comment\n]',
        //skipRoundTripCheck: false,
        [
            openBrace(),
            simpleString("1"),
            simpleString("a"),
            //["token", "linecomment", "a line comment", null],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "block comment": test(
        `[ 1, "a" /*a comment\t\t\n\t\t*/ ]`,
        //formattedText: '[ 1, "a" /*a comment\t\t\n\t\t*/ ]',
        [
            openBrace(),
            simpleString("1"),
            simpleString("a"),
            //["token", "blockcomment", "a comment\t\t\n\t\t", null],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "block comment 2": test(
        `[ 1, "a" /*a comment b * c*/ ]`,
        [
            openBrace(),
            simpleString("1"),
            simpleString("a"),
            //["token", "blockcomment", "a comment b * c", null],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    //     "block comment 3": test(
    //        `[
    //     "A"
    //             /*
    //             a comment
    //             */
    //         ]`,
    //         formattedText: `[
    //     "A"
    //             /*
    //             a comment
    //             */
    //             ]`,
    //         [
    //             openBrace(),
    //             simpleString("A"),
    //             ["token", "blockcomment", "\n            a comment\n            ", null],
    //             closeArray(),
    //             treeEnd(), 
    //             streamEnd(),
    //         ],
    // ),
    //     "block comment 4": test(
    //        `[
    //     "A"
    // /*
    // a comment
    //     an indented comment line
    //         an extra indented comment line
    // */
    //         ]`,
    //         formattedText: `[
    //     "A"
    // /*
    // a comment
    //     an indented comment line
    //         an extra indented comment line
    // */
    // ]`,
    // ),
    "parens instead of braces": test(
        `( "a": "foo" )`,
        [
            openCurly(),
            simpleString("a"),
            simpleString("foo"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "open paren and close curly": test(
        `( "a": "foo" }`,
        [
            openCurly(),
            simpleString("a"),
            simpleString("foo"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "missing comma": test(
        `[ "foo" "bar" ]`,
        [
            openBrace(),
            simpleString("foo"),
            simpleString("bar"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "angle brackets instead of brackets": test(
        `< "foo" >`,
        [
            openAngleBracket(),
            simpleString("foo"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "apostrophe string": test(
        `'a string'`,
        //testForLocation: true,
        [
            simpleString("a string"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "tagged union": test(
        `| "foo" "x"`,
        [
            openTaggedUnion(),
            simpleString("foo"),
            simpleString("x"),
            taggedUnionEnd(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "incomplete tagged union": test(
        `| "foo"`,
        [
            openTaggedUnion(),
            simpleString("foo"),
            parsingerror("missing value"),
            missing(),
            streamEnd(),
        ],
    ),
    "incomplete tagged union in object": test(
        `( "a": | "foo" )`,
        [
            openCurly(),
            simpleString("a"),
            openTaggedUnion(),
            simpleString("foo"),
            parsingerror("missing value"),
            missing(),
            taggedUnionEnd(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "incomplete tagged union in object 2": test(
        `( "a": | )`,
        [
            openCurly(),
            simpleString("a"),
            openTaggedUnion(),
            parsingerror("missing tagged union option and value"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "tagged union with number at end": test(
        `| "foo" 5`,
        [
            openTaggedUnion(),
            simpleString("foo"),
            simpleString("5"),
            taggedUnionEnd(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "tagged union with string at end": test(
        `| "foo" "a string"`,
        [
            openTaggedUnion(),
            simpleString("foo"),
            simpleString("a string"),
            taggedUnionEnd(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "tagged union with missing data": test(
        `{ "bla": | "foo" //comment\n}`,
        [
            openCurly(),
            simpleString("bla"),
            openTaggedUnion(),
            simpleString("foo"),
            //["token", "linecomment", "comment", null],
            parsingerror("missing value"),
            missing(),
            taggedUnionEnd(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "double tagged union with missing data": test(
        `{ "bla": | "foo" | "bar" }`,
        [
            openCurly(),
            simpleString("bla"),
            openTaggedUnion(),
            simpleString("foo"),
            openTaggedUnion(),
            simpleString("bar"),
            parsingerror("missing value"),
            missing(),
            taggedUnionEnd(),
            taggedUnionEnd(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "schema": test(
        `!"a schema" 42`,
        [
            schemaDataStart(),
            simpleString("a schema"),
            instanceDataStart(),
            simpleString("42"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "schema 2": test(
        `!"a schema" ( )`,
        [
            schemaDataStart(),
            simpleString("a schema"),
            instanceDataStart(),
            openCurly(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "schema optional but not there": test(
        `42`,
        [
            instanceDataStart(),
            simpleString("42"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "schema required": test(
        `!"a schema" 42`,
        [
            schemaDataStart(),
            simpleString("a schema"),
            instanceDataStart(),
            simpleString("42"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "embedded schema": test(
        `! ! "astn/schema@0.1" (
    'component types': test(
        'root': (
            'node': (
                'properties': test(
                    'a1': (
                        'type': | 'value' (
                            'type': | 'number' (
                            )
                        )
                    )
                    'b': (
                        'type': | 'value' (
                            'type': | 'number' (
                            )
                        )
                    )
                    'c': (
                        'type': | 'value' (
                            'type': | 'text' (
                            )
                        )
                    )
                }
            )
        )
    }
    'root type': 'root'
){
    "a": "B"
    "b": "X"
    "c": "C"
}`,
        [
            schemaDataStart(),
            openCurly(),
            simpleString("component types"),
            openCurly(),
            simpleString("root"),
            openCurly(),
            simpleString("node"),
            openCurly(),
            simpleString("properties"),
            openCurly(),
            simpleString("a1"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("value"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("number"),
            openCurly(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            simpleString("b"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("value"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("number"),
            openCurly(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            simpleString("c"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("value"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("text"),
            openCurly(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            simpleString("root type"),
            simpleString("root"),
            closeObject(),
            treeEnd(),
            instanceDataStart(),
            openCurly(),
            simpleString("a"),
            simpleString("B"),
            simpleString("b"),
            simpleString("X"),
            simpleString("c"),
            simpleString("C"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "invalid internal schema": test(
        `! ! "astn/schema@0.1" (
    'component types': test(
        'x': (
            'node': (
                'properties': test(
                    'foo': (
                        'type': | 'value' (
                            'type': | 'number' /*problem here*/
                        )
                    )
                    'bar': (
                        'type': | 'taggedunion' (
                            'type': | 'number'
                        )
                    )
                }
            )
        )
    }
    'root type': "x"
)
(
    'foov': 42
)`,
        [
            schemaDataStart(),
            openCurly(),
            simpleString("component types"),
            openCurly(),
            simpleString("x"),
            openCurly(),
            simpleString("node"),
            openCurly(),
            simpleString("properties"),
            openCurly(),
            simpleString("foo"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("value"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("number"),
            parsingerror("missing value"),
            missing(),
            taggedUnionEnd(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            simpleString("bar"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("taggedunion"),
            openCurly(),
            simpleString("type"),
            openTaggedUnion(),
            simpleString("number"),
            parsingerror("missing value"),
            missing(),
            taggedUnionEnd(),
            closeObject(),
            taggedUnionEnd(),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            simpleString("root type"),
            simpleString("x"),
            closeObject(),
            treeEnd(),
            instanceDataStart(),
            openCurly(),
            simpleString("foov"),
            simpleString("42"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "comment": test(
        `//a comment
(
    "y": /*should be a number*/ true
)`,
        [
            //["token", "linecomment", "a comment", null],
            instanceDataStart(),
            openCurly(),
            simpleString("y"),
            //["token", "blockcomment", "should be a number", null],
            simpleString("true"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "empty type": test(
        `(
)`,
        [
            instanceDataStart(),
            openCurly(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
})