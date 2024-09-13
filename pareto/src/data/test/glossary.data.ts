import * as pd from 'pareto-core-data'

import { array, dictionary, group, member, string, taggedUnion, type } from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({}),
    'imports': d({}),
    'root': {
        'namespaces': d({}),
        'types': d({
            "TestData": type(dictionary(group({
                "definitions": member(dictionary(group({
                    "text": member(string()),
                    "events": member(array(taggedUnion({
                        "token": taggedUnion({
                            "simple string": string(),
                            "multiline string": string(),
                            "open array": string(),
                            "close array": group({}),
                            "open object": string(),
                            "close object": group({}),
                            "open tagged union": group({}),
                            "line comment": string(),
                            "block comment": string(),
                            "schema data start": group({}),
                        }),
                        "parsingerror": group({
                            "message": member(string()),
                        }),
                        "stream end": group({}),
                        "instance data start": group({}),
                        "valdidationerror": string(),
                        "tree end": group({}),
                        "tagged union end": group({}),
                        "missing": group({}),
                    }))),
                }))),
                "type": member(taggedUnion({
                    "json": group({}),
                    "astn": group({}),
                })),
            }))),
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}