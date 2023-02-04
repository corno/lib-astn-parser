import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.TGlossary = {
    'imports': d({
        "common": "glo-pareto-common",
    }),
    'parameters': d({
        "Annotation": {},
    }),
    'templates': d({}),
    'types': types({
        "HeaderParserError": taggedUnion({
            "expected the schema start (!) or root value": group({}),
            "expected an embedded schema": group({}),
            "expected a schema reference or an embedded schema": group({}),
            "expected a schema schema reference": group({}),
        }),
        "TreeParserError": taggedUnion({


            "missing array close": group({}),
            "missing key": group({}),
            "missing object close": group({}),
            "missing option": group({}),
            "missing value": group({}),
            "missing tagged union option and value": group({}),
            "unexpected data after end": group({}),
            "unexpected header start": group({}),
            "unexpected end of array": group({}),
            "unexpected end of object": group({}),
            "unexpected end of text": group({
                "still in": member(taggedUnion({
                    "array": group({}),
                    "object": group({}),
                    "tagged union": group({}),
                }))
            }),
        })


    }),
    'interfaces': d({
    }),
    'functions': d({
        "X": func(typeReference("common", "Null"), null, null, null),
        "CreateHeaderParserErrorMessage": func(typeReference("HeaderParserError"), null, null, data(typeReference("common", "String"), false)),
        "CreateTreeParserErrorMessage": func(typeReference("TreeParserError"), null, null, data(typeReference("common", "String"), false)),
    }),
}