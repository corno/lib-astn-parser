import * as pl from "pareto-core-lib"

import * as ap from "astn-tokenconsumer-api"

import * as tc from "astn-tokenconsumer-api"
import * as th from "astn-handlers-api"


export function createFlattener<PAnnotation>(
    onToken: ($: {
        token: tc.Token,
        annotation: Annotation,
    }) => void,
    taggedUnionEnd: () => void,
    missing: () => void,
): th.IRequiredValueHandler<PAnnotation> {
    function wrap(
    ): th.IRequiredValueHandler<PAnnotation> {
        return {
            exists: createValueHandler(),
            missing: missing,
        }
    }

    function onEvent(
        event: ap.Token,
        annotation: Annotation,
    ) {
        onToken({
            annotation: annotation,
            token: event,
        })
    }

    function doSimpleString($: th.SimpleStringToken<PAnnotation>) {
        onEvent(
            ["simple string", {
                value: $.token.value,
                wrapping: ((): ap.Wrapping => {
                    switch ($.token.wrapping[0]) {
                        case "apostrophe":
                            return ["apostrophe", { }]
                        case "none":
                            return ["none", { }]
                        case "quote":
                            return ["quote", { }]
                        default:
                            return pl.au($.token.wrapping[0])
                    }
                })(),
            }],
            $.annotation,
        )
    }
    function createValueHandler(
    ): th.IValueHandler<PAnnotation> {
        return {
            array: ($) => {
                const open$ = $
                onEvent(
                    ["structural", {
                        "type": ((): ap.StructuralTokenType => {
                            switch ($.token.token.type[0]) {
                                case "list":
                                    return ["open list", null]
                                case "shorthand group":
                                    return ["open shorthand group", null]
                                default:
                                    return pl.au($.token.token.type[0])
                            }
                        })(),
                    }],
                    $.token.annotation
                )
                return {
                    element: () => {
                        return createValueHandler()
                    },
                    onEnd: ($) => {
                        onEvent(
                            ["structural", {
                                "type": ((): ap.StructuralTokenType => {
                                    switch (open$.token.token.type[0]) {
                                        case "list":
                                            return ["close list", null]
                                        case "shorthand group":
                                            return ["close shorthand group", null]
                                        default:
                                            return pl.au(open$.token.token.type[0])
                                    }
                                })(),
                            }],
                            $.token.annotation
                        )
                    },
                }
            },
            object: ($) => {
                const open$ = $
                onEvent(
                    ["structural", {
                        "type": ((): ap.StructuralTokenType => {
                            switch ($.token.token.type[0]) {
                                case "dictionary":
                                    return ["open dictionary", null]
                                case "verbose group":
                                    return ["open verbose group", null]
                                default:
                                    return pl.au($.token.token.type[0])
                            }
                        })(),
                    }],
                    $.token.annotation
                )

                return {
                    property: ($) => {
                        doSimpleString($.token)
                        return wrap()
                    },
                    anonymousProperty: ($) => {
                        return createValueHandler()
                    },
                    onEnd: ($) => {
                        onEvent(
                            ["structural", {
                                "type": ((): ap.StructuralTokenType => {
                                    switch (open$.token.token.type[0]) {
                                        case "dictionary":
                                            return ["close dictionary", null]
                                        case "verbose group":
                                            return ["close verbose group", null]
                                        default:
                                            return pl.au(open$.token.token.type[0])
                                    }
                                })(),
                            }],
                            $.token.annotation
                        )
                    },
                }
            },
            simpleString: ($) => {
                doSimpleString($.token)
            },
            multilineString: ($) => {
                onEvent(
                    ["multiline string", {
                        lines: $.token.token.lines.map(($) => {
                            return $
                        }),
                    }],
                    $.token.annotation,
                )
            },
            taggedUnion: ($) => {
                onEvent(
                    ["structural", {
                        "type": ["tagged union start", null],
                    }],
                    $.token.annotation
                )
                return {
                    option: ($) => {
                        doSimpleString($.token)
                        return wrap()
                    },
                    missingOption: () => wrap(),
                    end: () => {
                        taggedUnionEnd()
                    },
                }
            },
        }
    }
    return wrap()
}