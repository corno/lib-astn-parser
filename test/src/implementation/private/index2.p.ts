// import * as pl from 'pareto-core-lib'
// import * as pb from 'pareto-core-exe'
// import * as pc from "pareto-core-candidates"

// pl.logDebugMessage("no tests yet")

// import * as lib from "../../../pub/dist"
// import * as fsRes from "pareto-filesystem-res"

// import * as at from "astn-tokenizer-lib"
// import * as ata from "astn-tokenizer-api"
// import * as h from "astn-handlers-api"

// type Object = { [key: string]: PossibleValue }

// type PossibleValue = Value | null

// type Array = Value[]

// type TaggedUnion = [string | null, Value | null]

// type Value =
//     | string
//     | TaggedUnion
//     | Value[]
//     | Object

// function createLoggingTreeHandler<TokenAnnotation>(): h.ITreeHandler<TokenAnnotation> {
//     let res: PossibleValue

//     return {
//         root: createLoggingRequiredValueHandler(($) => {
//             if (res !== undefined) {
//                 pc.panic("NOT UNDEFINED")
//             }
//             res = $
//         }),
//         onEnd: () => {

//             pl.logDebugMessage(JSON.stringify(res, undefined, "\t"))
//         }
//     }
// }

// function createLoggingValueHandler<TokenAnnotation>(set: (value: Value) => void): h.IValueHandler<TokenAnnotation> {

//     function createLoggingObjectHandler(x: Object): h.IObjectHandler<TokenAnnotation> {
//         return {
//             property: ($) => {
//                 return createLoggingRequiredValueHandler((res) => {
//                     x[`>${$.token.token.value}`] = res
//                 })
//             },
//             anonymousProperty: () => {
//                 return createLoggingValueHandler((res) => {

//                 })
//             },
//             onEnd: () => { },
//         }
//     }
//     function createLoggingArrayHandler(x: Array): h.IArrayHandler<TokenAnnotation> {
//         return {
//             element: () => {
//                 return createLoggingValueHandler((val) => {
//                     x.push(val)
//                 })
//             },
//             onEnd: () => { }
//         }
//     }
//     function createLoggingTaggedUnionHandler(x: TaggedUnion): h.ITaggedUnionHandler<TokenAnnotation> {
//         return {
//             option: ($) => {
//                 x[0] = $.token.token.value
//                 return createLoggingRequiredValueHandler(($) => {
//                     x[1] = $
//                 })
//             },
//             missingOption: () => {
//                 return createLoggingRequiredValueHandler(($) => {
//                     x[1] = $
//                 })
//             },
//             end: () => { }
//         }
//     }
//     return {
//         object: () => {
//             const x: Object = {}
//             set(x)
//             return createLoggingObjectHandler(x)
//         },
//         array: () => {
//             const x: Array = []
//             set(x)
//             return createLoggingArrayHandler(x)
//         },
//         taggedUnion: () => {

//             const x: TaggedUnion = [null, null]
//             set(x)
//             return createLoggingTaggedUnionHandler(x)
//         },
//         simpleString: ($) => {
//             set($.token.token.value)
//         },
//         multilineString: ($) => {
//             set($.token.token.lines.join(`\n`))

//         }
//     }
// }
// function createLoggingRequiredValueHandler<TokenAnnotation>(set: (value: Value | null) => void): h.IRequiredValueHandler<TokenAnnotation> {
//     return {
//         missing: () => {
//             //throw new Error("@@@@")
//             set(null)
//         },
//         exists: createLoggingValueHandler(($) => {
//             set($)
//         })
//     }

// }

// pb.runProgram($ => {

//     const parserLib = lib.init()

//     const tokenizerLib = at.init()


//     const createTokenizer = tokenizerLib.createCreateTokenizer(
//         {
//             onError: ($) => {
//                 logError(tokenizerLib.createTokenizerErrorMessage($.error))
//             },
//         }
//     )

//     const err = pb.createStdErr()

//     function logError(str: string) {
//         err.write(str)
//         err.write("\n")
//     }

//     if ($.argument === undefined) {
//         throw "HMMMM"
//     }
//     pl.logDebugMessage($.argument)
//     fsRes.$.readFile(
//         {
//             path: [$.argument, "in.astn"]
//         },
//     ).execute($ => {
//         switch ($[0]) {
//             case "error":
//                 pl.cc($[1], ($) => {
//                     logError(`FS error: ${$.error[0]}`)
//                 })
//                 break
//             case "success":
//                 pl.cc($[1], ($) => {
//                     const tok = createTokenizer({
//                         consumer: parserLib.createCreateHeaderParser<ata.TokenizerAnnotationData>(
//                             {
//                                 onError: ($) => {
//                                     logError(parserLib.createHeaderErrorMessage($.error))
//                                 }
//                             }
//                         )(
//                             {

//                                 handler: {
//                                     onEmbeddedSchema: () => {
//                                         throw "FIXME"
//                                     },
//                                     onNoInternalSchema: () => {
//                                         pl.logDebugMessage("NO INTERNAL SCHEMA ")
//                                         return {
//                                             onEnd: () => {

//                                             },
//                                             onToken: () => { }
//                                         }
//                                     },
//                                     onSchemaReference: ($) => {
//                                         pl.logDebugMessage($.token.token.value)
//                                         if ($.token.token.value !== "mrshl/schemaschema@0.1") {
//                                             throw "FIXME"
//                                         }
//                                         const tmp = parserLib.createCreateTreeParser<ata.TokenizerAnnotationData>({
//                                             onError: ($) => {
//                                                 logError(parserLib.createTreeParserErrorMessage($.error))
//                                             }
//                                         })({

//                                             handler: createLoggingTreeHandler(),
//                                             // lib.createDeserializer(
//                                             //     {
//                                             //         onExpectIssue: ($, annotation) => {
//                                             //             logError("expect issue !!!!!")
//                                             //         },
//                                             //         onResolveError: ($) => {
//                                             //             logError($)

//                                             //         },
//                                             //         onMissingValue: ($) => {
//                                             //             logError(`missing value @ ${$ === null ? "root" : tokenizerLib.createRangeMessage($.range)}`)

//                                             //         },
//                                             //         onEnd: () => {

//                                             //         },
//                                             //         callback: ($) => {
//                                             //             if ($ !== null) {
//                                             //                 // lib.generateCode(
//                                             //                 //     $
//                                             //                 // )
//                                             //                 lib.generateCode2(
//                                             //                     $,
//                                             //                     ($) => {
//                                             //                         const root = $

//                                             //                         fp.processBlock(($) => $)(
//                                             //                             {
//                                             //                                 onData: ($) => {
//                                             //                                     pl.logDebugMessage("FIXME!!!!")
//                                             //                                 },
//                                             //                                 onEnd: () => {

//                                             //                                 }
//                                             //                             },
//                                             //                             {
//                                             //                                 indentation: "    ",
//                                             //                                 newline: "\n",
//                                             //                                 trimLines: true,
//                                             //                             },
//                                             //                             ($) => {
//                                             //                                 pll.generateTypeScript(
//                                             //                                     pll.createBuilder(root),
//                                             //                                     $,
//                                             //                                 )
//                                             //                             }
//                                             //                         )
//                                             //                     }
//                                             //                 )
//                                             //             }
//                                             //         }
//                                             //     }

//                                             // ),
//                                         })
//                                         return {
//                                             onToken: ($) => {
//                                                 //pl.logDebugMessage($.token[0])
//                                                 tmp.onToken($)
//                                             },
//                                             onEnd: ($) => {
//                                                 tmp.onEnd($)
//                                             }
//                                         }
//                                     },
//                                 },
//                             }
//                         )
//                     })


//                     tok.onData($)
//                     tok.onEnd()

//                 })
//                 break
//             default: pl.au($[0])
//         }
//     })


// })
