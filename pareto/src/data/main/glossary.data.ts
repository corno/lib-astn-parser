import * as pd from 'pareto-core-data'

import { aconstructor, aInterfaceMethod, aInterfaceReference, data, externalTypeReference, glossaryParameter, group, imp, member, ref, sfunction, stream, taggedUnion, type, typeReference } from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({
        "Annotation": null,
    }),
    'imports': d({
        "common": imp({}),
        "h": imp({ "Annotation": typeReference("Annotation") }),
        "tc": imp({ "Annotation": typeReference("Annotation") }),
    }),
    'types': d({
        "AnnotatedHeaderParserError": type(group({
            "annotation": member(glossaryParameter("Annotation")),
            "error": member(ref(typeReference("HeaderParserError"))),
        })),
        "AnnotatedTreeParserError": type(group({
            "annotation": member(glossaryParameter("Annotation")),
            "error": member(ref(typeReference("TreeParserError"))),
        })),
        "Annotation": type(glossaryParameter("Annotation")),
        "EmbeddedSchema": type(group({
            "headerAnnotation": member(glossaryParameter("Annotation")),
            "embeddedSchemaAnnotation": member(glossaryParameter("Annotation")),
            "schemaSchemaReferenceToken": member(ref(externalTypeReference("h", "SimpleStringToken"))),
        })),
        "HeaderParserError": type(taggedUnion({
            "expected the schema start (!) or root value": group({}),
            "expected an embedded schema": group({}),
            "expected a schema reference or an embedded schema": group({}),
            "expected a schema schema reference": group({}),
        })),
        "SchemaReference": type(group({
            "headerAnnotation": member(glossaryParameter("Annotation")),
            "token": member(ref(externalTypeReference("h", "SimpleStringToken"))),
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
                })),
            }),
        })),
    }),
    'asynchronous': {
        'interfaces': d({
            "HeaderParserHandler": ['choice', {
                'options': d({
                    "onEmbeddedSchema": aInterfaceMethod(typeReference("EmbeddedSchema"), ['reference', aInterfaceReference("tc", "TokenConsumer")]),
                    "onSchemaReference": aInterfaceMethod(typeReference("SchemaReference"), ['reference', aInterfaceReference("tc", "TokenConsumer")]),
                    "onNoInternalSchema": aInterfaceMethod(null, ['reference', aInterfaceReference("tc", "TokenConsumer")]),
                }),
            }],
            "HeaderParserErrorHandler": stream(
                aInterfaceMethod(typeReference("AnnotatedHeaderParserError")),
                aInterfaceMethod(null),
            ),
            "TreeParserErrorHandler": stream(
                aInterfaceMethod(typeReference("AnnotatedTreeParserError")),
                aInterfaceMethod(null),
            ),
        }),
        'algorithms': d({
            "CreateHeaderParser": aconstructor(aInterfaceReference("tc", "TokenConsumer"), {
                "handler": aInterfaceReference("HeaderParserHandler"),
                "errorHandler": aInterfaceReference("HeaderParserErrorHandler"),

            }),
            "CreateTreeParser": aconstructor(aInterfaceReference("tc", "TokenConsumer"), {
                "handler": aInterfaceReference("h", "RequiredValueHandler"),
                "errorHandler": aInterfaceReference("TreeParserErrorHandler"),

            }),
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "CreateHeaderParserErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("HeaderParserError"))),
            "CreateTreeParserErrorMessage": sfunction(externalTypeReference("common", "String"), data(typeReference("TreeParserError"))),

        }),
    },
}