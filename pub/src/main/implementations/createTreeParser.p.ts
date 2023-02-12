import * as pl from 'pareto-core-lib'
import * as pm from 'pareto-core-state'

import * as h from "api-astn-handlers"
import * as papi from "api-astn-tokenconsumer"
import * as api from "../../interface"

export const $$: api.FCreateCreateTreeParser = ($x) => {

    function x<PAnnotation>($x: {
        readonly "onError": ($: {
            readonly "error": api.TTreeParserError
            readonly "annotation": PAnnotation
        }) => void
    }

    ): api.FCreateTreeParser<PAnnotation> {
        return ($i) => {

            function createTreeParser(
            ): papi.ITokenConsumer<PAnnotation> {

                type ObjectContext = {
                    type:
                    | ["dictionary", null]
                    | ["verbose group", null]
                    readonly objectHandler: h.IObjectHandler<PAnnotation>
                }

                type ArrayContext = {
                    type:
                    | ["list", null]
                    | ["shorthand group", null]
                    foundElements: boolean
                    readonly arrayHandler: h.IArrayHandler<PAnnotation>
                }

                type TaggedUnionContext = {
                    readonly handler: h.ITaggedUnionHandler<PAnnotation>
                }

                type ExpectingValue = {
                    handler: h.IRequiredValueHandler<PAnnotation>
                }

                type ContextType =
                    | ["expecting value", ExpectingValue]
                    | ["processing object", ObjectContext]
                    | ["processing array", ArrayContext]
                    | ["processing taggedunion", TaggedUnionContext]

                type Processing = {
                    currentContext: ContextType
                    stack: pm.Stack<ContextType>
                }

                type State2 =
                    | ["processing", Processing]
                    | ["done", null]

                let state2: State2 = ["processing", {
                    currentContext: ["expecting value", {
                        handler: $i.handler.root
                    }],
                    stack: pm.createStack(pl.createEmptyArray()),
                }]


                return {
                    onToken: (token) => {
                        function raiseError(error: api.TTreeParserError) {
                            $x.onError({
                                error: error,
                                annotation: token.annotation,
                            })
                        }
                        function handleToken() {

                            switch (state2[0]) {
                                case "processing":
                                    pl.cc(state2[1], ($) => {
                                        const processing = $

                                        function pop(
                                        ): void {
                                            processing.stack.pop(
                                                ($) => {
                                                    const previousContext = $
                                                    processing.currentContext = previousContext
                                                    switch (previousContext[0]) {
                                                        case "expecting value":
                                                            pl.cc(previousContext[1], ($) => {
                                                                pop()
                                                            })
                                                            break
                                                        case "processing array":
                                                            pl.cc(previousContext[1], ($) => {
                                                            })
                                                            break
                                                        case "processing object":
                                                            pl.cc(previousContext[1], ($) => {
                                                            })
                                                            break
                                                        case "processing taggedunion":
                                                            pl.cc(previousContext[1], ($) => {
                                                                $.handler.end({})
                                                                pop()
                                                            })
                                                            break
                                                        default: pl.au(previousContext[0])
                                                    }
                                                },
                                                () => {

                                                    $i.handler.onEnd()
                                                    state2 = ["done", null]
                                                }
                                            )
                                        }
                                        function push(
                                            newContext: ContextType,
                                        ): void {
                                            processing.stack.push(processing.currentContext)
                                            processing.currentContext = newContext
                                        }
                                        function testForValue(
                                            onValue: () => h.IValueHandler<PAnnotation>,
                                            onNonValue: (
                                                token:
                                                    | ["close object", null]
                                                    | ["close array", null]
                                            ) => void,
                                            onTerminal: () => void,
                                        ) {
                                            switch (token.token[0]) {
                                                case "header start": {
                                                    raiseError(["unexpected header start", null])
                                                    break
                                                }
                                                case "structural": {

                                                    const punctuation = token.token[1]
                                                    switch (punctuation.type[0]) {
                                                        case "close shorthand group":
                                                            onNonValue(["close array", null])
                                                            break
                                                        case "close list":
                                                            onNonValue(["close array", null])
                                                            break
                                                        case "open shorthand group":
                                                            pl.cc(punctuation.type[1], ($) => {
                                                                push(
                                                                    ["processing array", {
                                                                        foundElements: false,
                                                                        type: ["shorthand group", null],
                                                                        arrayHandler: onValue().array({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: {
                                                                                    type: ["shorthand group", null]
                                                                                }
                                                                            }

                                                                        }),
                                                                    }]
                                                                )
                                                            })
                                                            break
                                                        case "open list":
                                                            pl.cc(punctuation.type[1], ($) => {
                                                                push(
                                                                    ["processing array", {
                                                                        foundElements: false,
                                                                        type: ["list", null],
                                                                        arrayHandler: onValue().array({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: {
                                                                                    type: ["list", null]
                                                                                }
                                                                            }

                                                                        }),
                                                                    }]
                                                                )
                                                            })
                                                            break
                                                        case "close dictionary":
                                                            onNonValue(["close object", null])
                                                            break
                                                        case "close verbose group":
                                                            onNonValue(["close object", null])
                                                            break
                                                        case "open dictionary":
                                                            pl.cc(punctuation.type[1], ($) => {
                                                                push(
                                                                    ["processing object", {
                                                                        type: ["dictionary", null],
                                                                        objectHandler: onValue().object({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: {
                                                                                    type: ["dictionary", null]
                                                                                }
                                                                            }
                                                                        }),
                                                                    }]
                                                                )

                                                            })
                                                            break
                                                        case "open verbose group":
                                                            pl.cc(punctuation.type[1], ($) => {
                                                                push(
                                                                    ["processing object", {
                                                                        type: ["verbose group", null],
                                                                        objectHandler: onValue().object({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: {
                                                                                    type: ["verbose group", null]
                                                                                }
                                                                            }
                                                                        }),
                                                                    }]
                                                                )
                                                            })
                                                            break
                                                        case "tagged union start":
                                                            pl.cc(punctuation.type[1], ($) => {
                                                                push(
                                                                    ["processing taggedunion", {
                                                                        handler: onValue().taggedUnion({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: null
                                                                            }

                                                                        })
                                                                    }]
                                                                )

                                                            })
                                                            break
                                                        default:
                                                            pl.au(punctuation.type[0])
                                                    }
                                                    break
                                                }
                                                case "simple string": {
                                                    pl.cc(token.token[1], ($) => {
                                                        onValue().simpleString({
                                                            token: {
                                                                annotation: token.annotation,
                                                                token: $
                                                            }

                                                        })
                                                        onTerminal()
                                                    })

                                                    break
                                                }
                                                case "multiline string": {
                                                    pl.cc(token.token[1], ($) => {
                                                        onValue().multilineString({
                                                            token: {
                                                                annotation: token.annotation,
                                                                token: $
                                                            }

                                                        })
                                                        onTerminal()
                                                    })
                                                    break
                                                }
                                                default:
                                                    pl.au(token.token[0])
                                            }
                                        }
                                        switch ($.currentContext[0]) {
                                            case "expecting value":
                                                pl.cc($.currentContext[1], ($) => {
                                                    testForValue(
                                                        () => $.handler.exists,
                                                        ($$) => {
                                                            raiseError(["missing value", null])
                                                            $.handler.missing({
                                                                annotation: token.annotation
                                                            })
                                                            pop()
                                                            handleToken()
                                                        },
                                                        () => {
                                                            pop()
                                                        }
                                                    )
                                                })
                                                break
                                            case "processing array":
                                                pl.cc($.currentContext[1], ($) => {
                                                    const arrayContext = $
                                                    testForValue(
                                                        () => $.arrayHandler.element({
                                                            annotation: token.annotation
                                                        }),
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case "close object":
                                                                    pl.cc($[1], ($) => {
                                                                        raiseError(["unexpected end of object", null])
                                                                    })
                                                                    break
                                                                case "close array":
                                                                    pl.cc($[1], ($) => {
                                                                        arrayContext.arrayHandler.onEnd({
                                                                            token: {
                                                                                annotation: token.annotation,
                                                                                token: null,
                                                                            }
                                                                        })
                                                                        pop()
                                                                    })
                                                                    break
                                                                default: pl.au($[0])
                                                            }
                                                        },
                                                        () => {
                                                            //nothing to do
                                                        },
                                                    )
                                                })
                                                break
                                            case "processing object":
                                                pl.cc($.currentContext[1], ($) => {
                                                    const objectContext = $
                                                    if (token.token[0] === "simple string") {
                                                        push(
                                                            ["expecting value", {
                                                                handler: objectContext.objectHandler.property({
                                                                    token: {
                                                                        annotation: token.annotation,
                                                                        token: token.token[1]
                                                                    }
                                                                })
                                                            }]
                                                        )
                                                    } else {
                                                        testForValue(
                                                            () => {
                                                                raiseError(["missing key", null])
                                                                return objectContext.objectHandler.anonymousProperty({
                                                                    annotation: token.annotation
                                                                })
                                                            },
                                                            ($) => {
                                                                if ($[0] === "close object") {
                                                                    objectContext.objectHandler.onEnd({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: null
                                                                        }
                                                                    })
                                                                    pop()
                                                                } else {
                                                                    raiseError(["missing object close", null])

                                                                    pop()
                                                                    handleToken()
                                                                }

                                                            },
                                                            () => {
                                                            }
                                                        )
                                                    }
                                                })
                                                break
                                            case "processing taggedunion":
                                                pl.cc($.currentContext[1], ($) => {
                                                    const tuh = $
                                                    if (token.token[0] === "simple string") {
                                                        push(
                                                            ["expecting value", {
                                                                handler: tuh.handler.option({
                                                                    token: {
                                                                        annotation: token.annotation,
                                                                        token: token.token[1]
                                                                    }
                                                                })
                                                            }]
                                                        )
                                                    } else {
                                                        //we have an error
                                                        testForValue(
                                                            () => {
                                                                raiseError(["missing option", null])
                                                                return tuh.handler.missingOption({
                                                                    annotation: token.annotation
                                                                }).exists
                                                            },
                                                            () => {
                                                                raiseError(["missing tagged union option and value", null])
                                                                pop()
                                                                handleToken()
                                                            },
                                                            () => {
                                                                //
                                                            }
                                                        )
                                                    }
                                                })
                                                break
                                            default: pl.au($.currentContext[0])
                                        }
                                    })
                                    break
                                case "done":
                                    pl.cc(state2[1], ($) => {
                                        raiseError(["unexpected data after end", null])
                                    })
                                    break
                                default: pl.au(state2[0])
                            }
                        }
                        handleToken()
                    },
                    onEnd: (endAnnotation) => {
                        function raiseError(error: api.TTreeParserError) {
                            $x.onError({
                                error: error,
                                annotation: endAnnotation,
                            })
                        }
                        switch (state2[0]) {
                            case "processing":
                                pl.cc(state2[1], ($) => {
                                    const state = $
                                    switch (state.currentContext[0]) {
                                        case "expecting value": {
                                            raiseError(["missing value", null])
                                            state.currentContext[1].handler.missing({
                                                annotation: endAnnotation
                                            })

                                            break
                                        }
                                        case "processing array": {
                                            const $ = state.currentContext[1]
                                            raiseError(["unexpected end of text", { "still in": ["array", null] }])
                                            break
                                        }
                                        case "processing object": {
                                            const $ = state.currentContext[1]
                                            raiseError(["unexpected end of text", { "still in": ["object", null] }])
                                            break
                                        }
                                        case "processing taggedunion": {
                                            const $ = state.currentContext[1]
                                            $.handler.missingOption({
                                                annotation: endAnnotation
                                            })

                                            raiseError(["unexpected end of text", { "still in": ["tagged union", null] }])

                                            break
                                        }
                                        default:
                                            pl.au(state.currentContext[0])
                                    }
                                })
                                break
                            case "done":
                                pl.cc(state2[1], ($) => {
                                })
                                break
                            default: pl.au(state2[0])
                        }
                    },
                }
            }
            return createTreeParser()
        }

    }
    return x($x)
}
