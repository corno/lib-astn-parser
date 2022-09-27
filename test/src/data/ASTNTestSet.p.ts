/* eslint
    camelcase:"off",
*/
import * as api from "../interface"


export const extensionTests: api.TTestDefinitions = {
    "unexpected data after end": {
        text: '"foo" "bar"',
        events: [
            ["token", "simple string", "foo", null],
            ["tree end", null],
            ["parsingerror", "unexpected data after end", null],
            ["stream end", null],
            // ["tree end", null],
            // ["stream end", null],
        ],
    },
    "multiline string": {
        text: '{ "foo": `bar` }',
        events: [
            ["token", "openobject", "{", null],
            ["token", "simple string", "foo", null],
            ["token", "multiline string", "bar", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "trailing comma": {
        text: '[ 1, 2, ]',
        events: [
            ["token", "openarray", "[", null],
            ["token", "simple string", "1", null],
            ["token", "simple string", "2", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    // "missing option": {
    //     text: '| { }',
    //     events: [
    //         ["token", "opentaggedunion", null],
    //         ["token", "openobject", "{", null],
    //         ["token", "closeobject", null],
    //         ["parsingerror", "missing option"],
    //         ["tree end", null], 
    //         ["stream end", null],
    //         ["parsingerror", "unexpected end of text, still in tagged union"],
    //     ],
    // },
    "line comment": {
        text: '[ 1, "a" //a line comment\r\n]',
        formattedText: '[ 1, "a" //a line comment\n]',
        skipRoundTripCheck: false,
        events: [
            ["token", "openarray", "[", null],
            ["token", "simple string", "1", null],
            ["token", "simple string", "a", null],
            //["token", "linecomment", "a line comment", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "block comment": {
        text: '[ 1, "a" /*a comment\t\t\n\t\t*/ ]',
        formattedText: '[ 1, "a" /*a comment\t\t\n\t\t*/ ]',
        events: [
            ["token", "openarray", "[", null],
            ["token", "simple string", "1", null],
            ["token", "simple string", "a", null],
            //["token", "blockcomment", "a comment\t\t\n\t\t", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "block comment 2": {
        text: '[ 1, "a" /*a comment b * c*/ ]',
        events: [
            ["token", "openarray", "[", null],
            ["token", "simple string", "1", null],
            ["token", "simple string", "a", null],
            //["token", "blockcomment", "a comment b * c", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    //     "block comment 3": {
    //         text: `[
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
    //         events: [
    //             ["token", "openarray", "[", null],
    //             ["token", "simple string", "A", null],
    //             ["token", "blockcomment", "\n            a comment\n            ", null],
    //             ["token", "closearray", null],
    //             ["tree end", null], 
    //             ["stream end", null],
    //         ],
    //     },
    //     "block comment 4": {
    //         text: `[
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
    //     },
    "parens instead of braces": {
        text: '( "a": "foo" )',
        events: [
            ["token", "openobject", "(", null],
            ["token", "simple string", "a", null],
            ["token", "simple string", "foo", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "open paren and close curly": {
        text: '( "a": "foo" }',
        events: [
            ["token", "openobject", "(", null],
            ["token", "simple string", "a", null],
            ["token", "simple string", "foo", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "missing comma": {
        text: '[ "foo" "bar" ]',
        events: [
            ["token", "openarray", "[", null],
            ["token", "simple string", "foo", null],
            ["token", "simple string", "bar", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "angle brackets instead of brackets": {
        text: '< "foo" >',
        events: [
            ["token", "openarray", "<", null],
            ["token", "simple string", "foo", null],
            ["token", "closearray", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "apostrophe string": {
        text: "'a string'",
        testForLocation: true,
        events: [
            ["token", "simple string", "a string", [1, 1, 1, 11]],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "tagged union": {
        text: '| "foo" "x"',
        events: [
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["token", "simple string", "x", null],
            ["tagged union end"],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "incomplete tagged union": {
        text: '| "foo"',
        events: [
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["stream end", null],
        ],
    },
    "incomplete tagged union in object": {
        text: '( "a": | "foo" )',
        events: [
            ["token", "openobject", "(", null],
            ["token", "simple string", "a", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "incomplete tagged union in object 2": {
        text: '( "a": | )',
        events: [
            ["token", "openobject", "(", null],
            ["token", "simple string", "a", null],
            ["token", "opentaggedunion", null],
            ["parsingerror", "missing tagged union option and value", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "tagged union with number at end": {
        text: '| "foo" 5',
        events: [
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["token", "simple string", "5", null],
            ["tagged union end"],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "tagged union with string at end": {
        text: '| "foo" "a string"',
        events: [
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["token", "simple string", "a string", null],
            ["tagged union end"],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "tagged union with missing data": {
        text: '{ "bla": | "foo" //comment\n}',
        events: [
            ["token", "openobject", "{", null],
            ["token", "simple string", "bla", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            //["token", "linecomment", "comment", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "double tagged union with missing data": {
        text: '{ "bla": | "foo" | "bar" }',
        events: [
            ["token", "openobject", "{", null],
            ["token", "simple string", "bla", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "foo", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "bar", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["tagged union end"],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "schema": {
        text: '!"a schema" 42',
        testHeaders: true,
        events: [
            ["token", "schema data start"],
            ["token", "simple string", "a schema", null],
            ["instance data start"],
            ["token", "simple string", "42", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "schema 2": {
        text: '!"a schema" ( )',
        testHeaders: true,
        events: [
            ["token", "schema data start"],
            ["token", "simple string", "a schema", null],
            ["instance data start"],
            ["token", "openobject", "(", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "schema optional but not there": {
        text: "42",
        testHeaders: true,
        events: [
            ["instance data start"],
            ["token", "simple string", "42", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "schema required": {
        text: '!"a schema" 42',
        testHeaders: true,
        events: [
            ["token", "schema data start"],
            ["token", "simple string", "a schema", null],
            ["instance data start"],
            ["token", "simple string", "42", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "embedded schema": {
        text: `! ! "astn/schema@0.1" (
    'component types': {
        'root': (
            'node': (
                'properties': {
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
        testHeaders: true,
        events: [
            ["token", "schema data start"],
            ["token", "openobject", "(", null],
            ["token", "simple string", "component types", null],
            ["token", "openobject", "{", null],
            ["token", "simple string", "root", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "node", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "properties", null],
            ["token", "openobject", "{", null],
            ["token", "simple string", "a1", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "value", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "number", null],
            ["token", "openobject", "(", null],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["token", "simple string", "b", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "value", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "number", null],
            ["token", "openobject", "(", null],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["token", "simple string", "c", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "value", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "text", null],
            ["token", "openobject", "(", null],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "simple string", "root type", null],
            ["token", "simple string", "root", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["instance data start"],
            ["token", "openobject", "{", null],
            ["token", "simple string", "a", null],
            ["token", "simple string", "B", null],
            ["token", "simple string", "b", null],
            ["token", "simple string", "X", null],
            ["token", "simple string", "c", null],
            ["token", "simple string", "C", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "invalid internal schema": {
        text: `! ! "astn/schema@0.1" (
    'component types': {
        'x': (
            'node': (
                'properties': {
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
        testHeaders: true,
        events: [
            ["token", "schema data start"],
            ["token", "openobject", "(", null],
            ["token", "simple string", "component types", null],
            ["token", "openobject", "{", null],
            ["token", "simple string", "x", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "node", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "properties", null],
            ["token", "openobject", "{", null],
            ["token", "simple string", "foo", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "value", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "number", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["token", "simple string", "bar", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "taggedunion", null],
            ["token", "openobject", "(", null],
            ["token", "simple string", "type", null],
            ["token", "opentaggedunion", null],
            ["token", "simple string", "number", null],
            ["parsingerror", "missing value", null],
            ["missing"],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["tagged union end"],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "closeobject", null],
            ["token", "simple string", "root type", null],
            ["token", "simple string", "x", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["instance data start"],
            ["token", "openobject", "(", null],
            ["token", "simple string", "foov", null],
            ["token", "simple string", "42", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "comment": {
        text: `//a comment
(
    "y": /*should be a number*/ true
)`,
        testHeaders: true,
        events: [
            //["token", "linecomment", "a comment", null],
            ["instance data start"],
            ["token", "openobject", "(", null],
            ["token", "simple string", "y", null],
            //["token", "blockcomment", "should be a number", null],
            ["token", "simple string", "true", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
    "empty type": {
        text: `(
)`,
        testHeaders: true,
        events: [
            ["instance data start"],
            ["token", "openobject", "(", null],
            ["token", "closeobject", null],
            ["tree end", null],
            ["stream end", null],
        ],
    },
}