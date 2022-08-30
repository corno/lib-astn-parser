import * as pl from "pareto-core-lib"

import * as inf from "../../interface"
import * as tc from "astn-tokenconsumer-api"
import { createHeaderErrorMessage } from "./createHeaderErrorMessage"

export function createCreateHeaderParser<Annotation>(
    $x: {
        onError: ($: {
            error: inf.HeaderError
            annotation: Annotation
        }) => void
    }
): inf.CreateHeaderParser<Annotation> {
    return ($y) => {
        type RootContext = {
            state:
            | ["expecting header or body", {}]
            | ["expecting schema reference or embedded schema", {
                headerAnnotation: Annotation
            }]
            | ["expecting schema schema reference", {
                headerAnnotation: Annotation
                embeddedSchemaAnnotation: Annotation
            }]
            | ["header is parsed", {
                parser: tc.ITokenConsumer<Annotation>
            }]
        }

        const rootContext: RootContext = { state: ["expecting header or body", {}] }

        return {
            onEnd: (annotation) => {
                function raiseError(error: inf.HeaderError) {
                    $x.onError({
                        error: error,
                        annotation: annotation,
                    })
                }
                switch (rootContext.state[0]) {
                    case "expecting header or body": {
                        //const $ = rootContext.state[1]
                        raiseError(["expected the schema start (!) or root value", {}])
                        break
                    }
                    case "expecting schema reference or embedded schema": {
                        raiseError(["expected a schema reference or an embedded schema", {}])
                        break
                    }
                    case "expecting schema schema reference": {
                        raiseError(["expected a schema schema reference", {}])
                        break
                    }
                    case "header is parsed": {
                        const $$ = rootContext.state[1]
                        $$.parser.onEnd(annotation)
                        break
                    }
                    default:
                        pl.au(rootContext.state[0])
                }
            },
            onToken: ($) => {
                const data = $
                function raiseError(error: inf.HeaderError) {
                    $x.onError({
                        error: error,
                        annotation: $.annotation,
                    })
                }
                switch (rootContext.state[0]) {
                    case "expecting header or body": {
                        if ($.token[0] === "header start") {

                            rootContext.state = ["expecting schema reference or embedded schema", {
                                headerAnnotation: $.annotation,
                            }]
                        } else {

                            const bp = $y.handler.onNoInternalSchema({})
                            rootContext.state = ["header is parsed", {
                                parser: bp,
                            }]
                            bp.onToken(data)
                        }
                        break
                    }
                    case "expecting schema reference or embedded schema": {
                        const headerAnnotation = rootContext.state[1].headerAnnotation
                        switch ($.token[0]) {
                            case "header start": {
                                rootContext.state = ["expecting schema schema reference", {
                                    headerAnnotation: headerAnnotation,
                                    embeddedSchemaAnnotation: $.annotation,
                                }]
                                break
                            }

                            case "structural": {
                                pl.cc($.token[1], ($) => {
                                    raiseError(["expected a schema reference or an embedded schema", {}])
                                })
                                break
                            }
                            case "simple string": {
                                pl.cc($.token[1], ($) => {
                                    const bp = $y.handler.onSchemaReference({
                                        headerAnnotation: headerAnnotation,
                                        token: {
                                            token: $,
                                            annotation: data.annotation,
                                        },
                                    })
                                    rootContext.state = ["header is parsed", {
                                        parser: bp,
                                    }]
                                })
                                break
                            }
                            case "multiline string": {
                                pl.cc($.token[1], ($) => {
                                    raiseError(["expected an embedded schema", {}])
                                })
                                break
                            }


                            default:
                                pl.au($.token[0])
                        }
                        break
                    }
                    case "expecting schema schema reference": {
                        const headerAnnotation = rootContext.state[1].headerAnnotation
                        const embeddedSchemaAnnotation = rootContext.state[1].embeddedSchemaAnnotation
                        if ($.token[0] !== "simple string") {
                            raiseError(["expected a schema schema reference", {}])
                        } else {
                            const x = $y.handler.onEmbeddedSchema({
                                headerAnnotation: headerAnnotation,
                                embeddedSchemaAnnotation: embeddedSchemaAnnotation,
                                schemaSchemaReferenceToken: {
                                    token: $.token[1],
                                    annotation: $.annotation,
                                },
                            })
                            rootContext.state = ["header is parsed", {
                                parser: x,
                                // schemaParser: createTreeParser({
                                //     handler: {
                                //         onEnd: ($) => {
                                //             x.onEnd($)
                                //             rootContext.state = ["processing body", {
                                //                 bodyParser: $p.handler.onBody(),
                                //             }]
                                //         },
                                //         root: x.root,
                                //     },
                                //     onError: $p.onError,
                                // }),
                            }]
                        }
                        break
                    }
                    // case "processing embedded schema": {
                    //     const $ = rootContext.state[1]
                    //     if (data.token[0] !== "content") {
                    //         throw new Error("IMPLEMENT ME")
                    //     }
                    //     $.schemaParser.onToken({
                    //         annotation: data.annotation,
                    //         token: data.token[1],
                    //     })
                    //     break
                    // }
                    // case "processing body": {
                    //     if (data.token[0] !== "content") {
                    //         throw new Error("IMPLEMENT ME")
                    //     }
                    //     const $ = rootContext.state[1]
                    //     $.bodyParser.onToken({
                    //         annotation: data.annotation,
                    //         token: data.token[1],
                    //     })
                    //     break
                    // }    
                    case "header is parsed": {
                        const $ = rootContext.state[1]
                        const parser = $.parser
                        if (data.token[0] === "header start") {

                            pl.panic("UNEXPECTED HEADER (ALREADY PARSED)")
                            //raiseError([""])
                        } else {
                            parser.onToken(data)
                        }
                        break
                    }
                    default:
                        pl.au(rootContext.state[0])
                }
            },
        }
    }
}


export function createCreateHeaderParserWithSerializedError<Annotation>(
    $x: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
): inf.CreateHeaderParser<Annotation> {
    return createCreateHeaderParser(
        {
            onError: ($) => {
                $x.onError(
                    {
                        error: `${createHeaderErrorMessage($.error)}`,
                        annotation: $.annotation,
                    }
                )
            }
        }
    )
}