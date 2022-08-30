import * as pl from "pareto-core-lib"
import * as pm from "pareto-statemachine-core"

import * as h from "astn-handlers-api"
import * as papi from "astn-tokenconsumer-api"
import * as inf from "../../interface"
import { createTreeParserErrorMessage } from "./createTreeParserErrorMessage"

export function createCreateTreeParser<Annotation>($x: {
    onError: ($: {
        error: inf.TreeParserError,
        annotation: Annotation,
    }) => void

}): inf.CreateTreeParser<Annotation> {
    return ($i) => {

        function createTreeParser(
        ): papi.ITokenConsumer<Annotation> {

            type ObjectContext = {
                type:
                | ["dictionary", {}]
                | ["verbose group", {}]
                readonly objectHandler: h.IObjectHandler<Annotation>
            }

            type ArrayContext = {
                type:
                | ["list", {}]
                | ["shorthand group", {}]
                foundElements: boolean
                readonly arrayHandler: h.IArrayHandler<Annotation>
            }

            type TaggedUnionContext = {
                readonly handler: h.ITaggedUnionHandler<Annotation>
            }

            type ExpectingValue = {
                handler: h.IRequiredValueHandler<Annotation>
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
                | ["done", {}]

            let state2: State2 = ["processing", {
                currentContext: ["expecting value", {
                    handler: $i.handler.root
                }],
                stack: pm.createStack(),
            }]


            return {
                onToken: (token) => {
                    function raiseError(error: inf.TreeParserError) {
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
                                        const previousContext = processing.stack.pop()
                                        if (previousContext === null) {
                                            $i.handler.onEnd()
                                            state2 = ["done", {
                                            }]
                                        } else {
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
                                        }
                                    }
                                    function push(
                                        newContext: ContextType,
                                    ): void {
                                        processing.stack.push(processing.currentContext)
                                        processing.currentContext = newContext
                                    }
                                    function testForValue(
                                        onValue: () => h.IValueHandler<Annotation>,
                                        onNonValue: (
                                            token:
                                                | ["close object", {}]
                                                | ["close array", {}]
                                        ) => void,
                                        onTerminal: () => void,
                                    ) {
                                        switch (token.token[0]) {
                                            case "header start": {
                                                raiseError(["unexpected header start", {}])
                                                break
                                            }
                                            case "structural": {

                                                const punctuation = token.token[1]
                                                switch (punctuation.type[0]) {
                                                    case "close shorthand group":
                                                        onNonValue(["close array", {}])
                                                        break
                                                    case "close list":
                                                        onNonValue(["close array", {}])
                                                        break
                                                    case "open shorthand group":
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ["processing array", {
                                                                    foundElements: false,
                                                                    type: ["shorthand group", {}],
                                                                    arrayHandler: onValue().array({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: {
                                                                                type: ["shorthand group", {}]
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
                                                                    type: ["list", {}],
                                                                    arrayHandler: onValue().array({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: {
                                                                                type: ["list", {}]
                                                                            }
                                                                        }

                                                                    }),
                                                                }]
                                                            )
                                                        })
                                                        break
                                                    case "close dictionary":
                                                        onNonValue(["close object", {}])
                                                        break
                                                    case "close verbose group":
                                                        onNonValue(["close object", {}])
                                                        break
                                                    case "open dictionary":
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ["processing object", {
                                                                    type: ["dictionary", {}],
                                                                    objectHandler: onValue().object({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: {
                                                                                type: ["dictionary", {}]
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
                                                                    type: ["verbose group", {}],
                                                                    objectHandler: onValue().object({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: {
                                                                                type: ["verbose group", {}]
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
                                                                            token: {
                                                                                // type: ["shorthand group", {}]
                                                                            }
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
                                                        raiseError(["missing value", {}])
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
                                                                    raiseError(["unexpected end of object", {}])
                                                                })
                                                                break
                                                            case "close array":
                                                                pl.cc($[1], ($) => {
                                                                    arrayContext.arrayHandler.onEnd({
                                                                        token: {
                                                                            annotation: token.annotation,
                                                                            token: {}
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
                                                            raiseError(["missing key", {}])
                                                            return objectContext.objectHandler.anonymousProperty({
                                                                annotation: token.annotation
                                                            })
                                                        },
                                                        ($) => {
                                                            if ($[0] === "close object") {
                                                                objectContext.objectHandler.onEnd({
                                                                    token: {
                                                                        annotation: token.annotation,
                                                                        token: {}
                                                                    }
                                                                })
                                                                pop()
                                                            } else {
                                                                raiseError(["missing object close", {}])

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
                                                            raiseError(["missing option", {}])
                                                            return tuh.handler.missingOption({
                                                                annotation: token.annotation
                                                            }).exists
                                                        },
                                                        () => {
                                                            raiseError(["missing tagged union option and value", {}])
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
                                    raiseError(["unexpected data after end", {}])
                                })
                                break
                            default: pl.au(state2[0])
                        }
                    }
                    handleToken()
                },
                onEnd: (endAnnotation) => {
                    function raiseError(error: inf.TreeParserError) {
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
                                        raiseError(["missing value", {}])
                                        state.currentContext[1].handler.missing({
                                            annotation: endAnnotation
                                        })

                                        break
                                    }
                                    case "processing array": {
                                        const $ = state.currentContext[1]
                                        raiseError(["unexpected end of text", { "still in": ["array", {}] }])
                                        break
                                    }
                                    case "processing object": {
                                        const $ = state.currentContext[1]
                                        raiseError(["unexpected end of text", { "still in": ["object", {}] }])
                                        break
                                    }
                                    case "processing taggedunion": {
                                        const $ = state.currentContext[1]
                                        $.handler.missingOption({
                                            annotation: endAnnotation
                                        })

                                        raiseError(["unexpected end of text", { "still in": ["tagged union", {}] }])

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


export function createCreateTreeParserWithSerializedError<Annotation>(
    $x: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
): inf.CreateTreeParser<Annotation> {
    return createCreateTreeParser(
        {
            onError: ($) => {
                $x.onError(
                    {
                        error: `${createTreeParserErrorMessage($.error)}`,
                        annotation: $.annotation
                    }
                )
            }
        }
    )
}