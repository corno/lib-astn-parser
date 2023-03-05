import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"


import { array, dictionary, group, member, string, taggedUnion, type } from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the ASTN parser",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "glo-astn-tokenconsumer": null,
        "glo-astn-handlers": null,
    }),
    'type': ['library', {
        'main': {
            'definition': {
                'glossary': {
                    'root': glossary,
                    'imports': d({
                        "common": external("glo-pareto-common"),
                        "tc":  external("glo-astn-tokenconsumer"),
                        "h":  external("glo-astn-handlers"),
                    }),
                },
                'api': {
                    'root': api,
                    'imports': d({
                        "common": external("glo-pareto-common"),
                        "this": this_(),
                    }),
                },
            },
            'implementation': ['typescript', null],
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "lib-astn-dummyhandlers": null,
            }),
            'glossary': {
                'functions': d({}),
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
                            }))),
                        }))),
                        "type": member(taggedUnion({
                            "json": group({}),
                            "astn": group({}),
                        })),
                    }))),
                }),
                'builders': d({}),
                'interfaces': d({}),
            },
            'imports': d({}),
        }
    }],
}