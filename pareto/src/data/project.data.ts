import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { array, dictionary, group, member, string, taggedUnion, type } from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the ASTN parser",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": {},
        "glo-astn-tokenconsumer": {},
        "glo-astn-handlers": {},
    }),
    'type': ['library', {
        'main': {
            'definition': {
                'glossary': glossary,
                'api': api,
            },
            'implementation': ['typescript', {}],
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "lib-astn-dummyhandlers": {},
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
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
                            })))
                        }))),
                        "type": member(taggedUnion({
                            "json": group({}),
                            "astn": group({}),
                        }))
                    })))
                }),
                'interfaces': d({}),
            },
        }
    }],
}