import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method, type, context, glossaryParameter, parametrizedTypeReference, parametrizedReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.T.Glossary<string> = {
    'imports': d({
        "common": "glo-pareto-common",
        "tc": "glo-astn-tokenconsumer",
        "h": "glo-astn-handlers",
    }),
    'parameters': d({
        "Annotation": {},
    }),
    'types': d({
        "AnnotatedHeaderParserError": type(group({
            "annotation": member(glossaryParameter("Annotation")),
            "error": member(reference("HeaderParserError")),
        })),
        "AnnotatedTreeParserError": type(group({
            "annotation": member(glossaryParameter("Annotation")),
            "error": member(reference("TreeParserError")),
        })),
        "Annotation": type(glossaryParameter("Annotation")),
        "EmbeddedSchema": type(group({
            "headerAnnotation": member(glossaryParameter("Annotation")),
            "embeddedSchemaAnnotation": member(glossaryParameter("Annotation")),
            "schemaSchemaReferenceToken": member(parametrizedReference("h", { "Annotation": typeReference("Annotation") }, "SimpleStringToken")),
        })),
        "HeaderParserError": type(taggedUnion({
            "expected the schema start (!) or root value": group({}),
            "expected an embedded schema": group({}),
            "expected a schema reference or an embedded schema": group({}),
            "expected a schema schema reference": group({}),
        })),
        "SchemaReference": type(group({
            "headerAnnotation": member(glossaryParameter("Annotation")),
            "token": member(parametrizedReference("h", { "Annotation": typeReference("Annotation") }, "SimpleStringToken")),
        })),
        "TreeParserError": type(taggedUnion({
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
        })),
    }),
    'interfaces': d({
        "HeaderHandler": ['group', {
            'members': d({
                "onEmbeddedSchema": method(typeReference("EmbeddedSchema"), ['reference', {
                    'context': context("tc", { "Annotation": typeReference("Annotation") }),
                    'interface': "TokenConsumer"
                }], false),
                "onSchemaReference": method(typeReference("SchemaReference"), ['reference', {
                    'context': context("tc", { "Annotation": typeReference("Annotation") }),
                    'interface': "TokenConsumer"
                }], false),
                "onNoInternalSchema": method(typeReference("common", "Null"), ['reference', {
                    'context': context("tc", { "Annotation": typeReference("Annotation") }),
                    'interface': "TokenConsumer"
                }], false),
            }),
        }],


        // export type IHeaderHandler<PAnnotation> = {
        //     readonly "onEmbeddedSchema": ($: {
        //         readonly "headerAnnotation": PAnnotation
        //         readonly "embeddedSchemaAnnotation": PAnnotation
        //         readonly "schemaSchemaReferenceToken": h.T.SimpleStringToken<PAnnotation>
        //     }) => tc.ITokenConsumer<PAnnotation>
        //     readonly "onSchemaReference": ($: {
        //         readonly "headerAnnotation": PAnnotation
        //         readonly "token": h.T.SimpleStringToken<PAnnotation>
        //     }) => tc.ITokenConsumer<PAnnotation>
        //     readonly "onNoInternalSchema": () => tc.ITokenConsumer<PAnnotation>
        // }
        "HeaderParserHandler": ['group', {
            'members': d({
                "onError": method(typeReference("AnnotatedHeaderParserError")),
                "handler": ['reference', interfaceReference("HeaderHandler")]
            })
        }],
        "TreeParserHandler": ['group', {
            'members': d({
                "onError": method(typeReference("AnnotatedTreeParserError")),
                "handler": ['reference', {
                    'context': context("h", { "Annotation": typeReference("Annotation") }),
                    'interface': "TreeHandler",
                }]
            })
        }],
    }),
    'functions': d({
        "CreateHeaderParser": func(typeReference("common", "Null"), null, interfaceReference("HeaderParserHandler"), inf({
            'context': context("tc", { "Annotation": typeReference("Annotation") }),
            'interface': "TokenConsumer"
        })),
        "CreateTreeParser": func(typeReference("common", "Null"), null, interfaceReference("TreeParserHandler"), inf({
            'context': context("tc", { "Annotation": typeReference("Annotation") }),
            'interface': "TokenConsumer"
        })),
        "CreateHeaderParserErrorMessage": func(typeReference("HeaderParserError"), null, null, data(typeReference("common", "String"), false)),
        "CreateTreeParserErrorMessage": func(typeReference("TreeParserError"), null, null, data(typeReference("common", "String"), false)),
    }),
}