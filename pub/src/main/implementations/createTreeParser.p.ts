import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'

import * as gapi from "../api"
import * as gh from "glo-astn-handlers"
import * as gtc from "glo-astn-tokenconsumer"

import { CcreateTreeParser } from "../api"

export const $$:CcreateTreeParser = ($d: {}) => {

    return <PAnnotation>($: null, $i: gapi.ITreeParserHandler<PAnnotation>) => {

        function createTreeParser(
        ): gtc.ITokenConsumer<PAnnotation> {

            type ObjectContext = {
                type:
                | ['dictionary', null]
                | ['verbose group', null]
                readonly objectHandler: gh.IObjectHandler<PAnnotation>
            }

            type ArrayContext = {
                type:
                | ['list', null]
                | ['shorthand group', null]
                foundElements: boolean
                readonly arrayHandler: gh.IArrayHandler<PAnnotation>
            }

            type TaggedUnionContext = {
                readonly handler: gh.ITaggedUnionHandler<PAnnotation>
            }

            type ExpectingValue = {
                handler: gh.IRequiredValueHandler<PAnnotation>
            }

            type ContextType =
                | ['expecting value', ExpectingValue]
                | ['processing object', ObjectContext]
                | ['processing array', ArrayContext]
                | ['processing taggedunion', TaggedUnionContext]

            type Processing = {
                currentContext: ContextType
                stack: ps.Stack<ContextType>
            }

            type State2 =
                | ['processing', Processing]
                | ['done', null]

            let state2: State2 = ['processing', {
                currentContext: ['expecting value', {
                    handler: $i.handler.root
                }],
                stack: ps.createEmptyStack(),
            }]


            return {
                onToken: (token) => {
                    function raiseError(error: gapi.T.TreeParserError<PAnnotation>) {
                        $i.onError({
                            error: error,
                            annotation: token.annotation,
                        })
                    }
                    function handleToken() {

                        switch (state2[0]) {
                            case 'processing':
                                pl.cc(state2[1], ($) => {
                                    const processing = $

                                    function pop(
                                    ): void {
                                        processing.stack.pop(
                                            ($) => {
                                                const previousContext = $
                                                processing.currentContext = previousContext
                                                switch (previousContext[0]) {
                                                    case 'expecting value':
                                                        pl.cc(previousContext[1], ($) => {
                                                            pop()
                                                        })
                                                        break
                                                    case 'processing array':
                                                        pl.cc(previousContext[1], ($) => {
                                                        })
                                                        break
                                                    case 'processing object':
                                                        pl.cc(previousContext[1], ($) => {
                                                        })
                                                        break
                                                    case 'processing taggedunion':
                                                        pl.cc(previousContext[1], ($) => {
                                                            $.handler.onEnd()
                                                            pop()
                                                        })
                                                        break
                                                    default: pl.au(previousContext[0])
                                                }
                                            },
                                            () => {

                                                $i.handler.onEnd()
                                                state2 = ['done', null]
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
                                        onValue: () => gh.IValueHandler<PAnnotation>,
                                        onNonValue: (
                                            token:
                                                | ['close object', null]
                                                | ['close array', null]
                                        ) => void,
                                        onTerminal: () => void,
                                    ) {
                                        switch (token.token[0]) {
                                            case 'header start': {
                                                raiseError(['unexpected header start', {}])
                                                break
                                            }
                                            case 'structural': {

                                                const punctuation = token.token[1]
                                                switch (punctuation.type[0]) {
                                                    case 'close shorthand group':
                                                        onNonValue(['close array', null])
                                                        break
                                                    case 'close list':
                                                        onNonValue(['close array', null])
                                                        break
                                                    case 'open shorthand group':
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ['processing array', {
                                                                    foundElements: false,
                                                                    type: ['shorthand group', null],
                                                                    arrayHandler: onValue().array({
                                                                        annotation: token.annotation,
                                                                        token: {
                                                                            type: ['shorthand group', {}]
                                                                        }

                                                                    }),
                                                                }]
                                                            )
                                                        })
                                                        break
                                                    case 'open list':
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ['processing array', {
                                                                    foundElements: false,
                                                                    type: ['list', null],
                                                                    arrayHandler: onValue().array({
                                                                        annotation: token.annotation,
                                                                        token: {
                                                                            type: ['list', {}]
                                                                        }
                                                                    }),
                                                                }]
                                                            )
                                                        })
                                                        break
                                                    case 'close dictionary':
                                                        onNonValue(['close object', null])
                                                        break
                                                    case 'close verbose group':
                                                        onNonValue(['close object', null])
                                                        break
                                                    case 'open dictionary':
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ['processing object', {
                                                                    type: ['dictionary', null],
                                                                    objectHandler: onValue().object({
                                                                        annotation: token.annotation,
                                                                        token: {
                                                                            type: ['dictionary', {}]
                                                                        }
                                                                    }),
                                                                }]
                                                            )

                                                        })
                                                        break
                                                    case 'open verbose group':
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ['processing object', {
                                                                    type: ['verbose group', null],
                                                                    objectHandler: onValue().object({
                                                                        annotation: token.annotation,
                                                                        token: {
                                                                            type: ['verbose group', {}]
                                                                        }
                                                                    }),
                                                                }]
                                                            )
                                                        })
                                                        break
                                                    case 'tagged union start':
                                                        pl.cc(punctuation.type[1], ($) => {
                                                            push(
                                                                ['processing taggedunion', {
                                                                    handler: onValue().taggedUnion({
                                                                            annotation: token.annotation,
                                                                            token: {}
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
                                            case 'simple string': {
                                                pl.cc(token.token[1], ($) => {
                                                    onValue().simpleString({
                                                        annotation: token.annotation,
                                                        token: $,
                                                    })
                                                    onTerminal()
                                                })

                                                break
                                            }
                                            case 'multiline string': {
                                                pl.cc(token.token[1], ($) => {
                                                    onValue().multilineString({
                                                        annotation: token.annotation,
                                                        token: $,
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
                                        case 'expecting value':
                                            pl.cc($.currentContext[1], ($) => {
                                                testForValue(
                                                    () => $.handler.exists,
                                                    ($$) => {
                                                        raiseError(['missing value', {}])
                                                        $.handler.missing(token.annotation)
                                                        pop()
                                                        handleToken()
                                                    },
                                                    () => {
                                                        pop()
                                                    }
                                                )
                                            })
                                            break
                                        case 'processing array':
                                            pl.cc($.currentContext[1], ($) => {
                                                const arrayContext = $
                                                testForValue(
                                                    () => $.arrayHandler.element(token.annotation),
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'close object':
                                                                pl.cc($[1], ($) => {
                                                                    raiseError(['unexpected end of object', {}])
                                                                })
                                                                break
                                                            case 'close array':
                                                                pl.cc($[1], ($) => {
                                                                    arrayContext.arrayHandler.onEnd({
                                                                        annotation: token.annotation,
                                                                        token: {},
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
                                        case 'processing object':
                                            pl.cc($.currentContext[1], ($) => {
                                                const objectContext = $
                                                if (token.token[0] === 'simple string') {
                                                    push(
                                                        ['expecting value', {
                                                            handler: objectContext.objectHandler.property({
                                                                annotation: token.annotation,
                                                                token: token.token[1]
                                                            })
                                                        }]
                                                    )
                                                } else {
                                                    testForValue(
                                                        () => {
                                                            raiseError(['missing key', {}])
                                                            return objectContext.objectHandler.anonymousProperty(token.annotation)
                                                        },
                                                        ($) => {
                                                            if ($[0] === 'close object') {
                                                                objectContext.objectHandler.onEnd({
                                                                    annotation: token.annotation,
                                                                    token: {},
                                                                })
                                                                pop()
                                                            } else {
                                                                raiseError(['missing object close', {}])

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
                                        case 'processing taggedunion':
                                            pl.cc($.currentContext[1], ($) => {
                                                const tuh = $
                                                if (token.token[0] === 'simple string') {
                                                    push(
                                                        ['expecting value', {
                                                            handler: tuh.handler.option({
                                                                annotation: token.annotation,
                                                                token: token.token[1]
                                                            })
                                                        }]
                                                    )
                                                } else {
                                                    //we have an error
                                                    testForValue(
                                                        () => {
                                                            raiseError(['missing option', {}])
                                                            return tuh.handler.missingOption(token.annotation).exists
                                                        },
                                                        () => {
                                                            raiseError(['missing tagged union option and value', {}])
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
                            case 'done':
                                pl.cc(state2[1], ($) => {
                                    raiseError(['unexpected data after end', {}])
                                })
                                break
                            default: pl.au(state2[0])
                        }
                    }
                    handleToken()
                },
                onEnd: (endAnnotation) => {
                    function raiseError(error: gapi.T.TreeParserError<PAnnotation>) {
                        $i.onError({
                            error: error,
                            annotation: endAnnotation,
                        })
                    }
                    switch (state2[0]) {
                        case 'processing':
                            pl.cc(state2[1], ($) => {
                                const state = $
                                switch (state.currentContext[0]) {
                                    case 'expecting value': {
                                        raiseError(['missing value', {}])
                                        state.currentContext[1].handler.missing(endAnnotation)

                                        break
                                    }
                                    case 'processing array': {
                                        const $ = state.currentContext[1]
                                        raiseError(['unexpected end of text', { 'still in': ['array', {}] }])
                                        break
                                    }
                                    case 'processing object': {
                                        const $ = state.currentContext[1]
                                        raiseError(['unexpected end of text', { 'still in': ['object', {}] }])
                                        break
                                    }
                                    case 'processing taggedunion': {
                                        const $ = state.currentContext[1]
                                        $.handler.missingOption(endAnnotation)

                                        raiseError(['unexpected end of text', { 'still in': ['tagged union', {}] }])

                                        break
                                    }
                                    default:
                                        pl.au(state.currentContext[0])
                                }
                            })
                            break
                        case 'done':
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
