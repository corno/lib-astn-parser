// /* eslint
//     no-console:"off",
//     complexity: "off",
// */
// import * as pl from 'pareto-core-lib'
// import * as pt from 'pareto-core-types'
// import * as pc from "pareto-core-candidates"
// import * as h from "astn-handlers-api"

// import * as lib from "../../../pub/dist"

// import { ownJSONTests } from "../data/ownJSONTestset"
// import { extensionTests } from "../data/ASTNTestSet"
// import { EventDefinition, TestRange, TestDefinition, TestLocation } from "../interfacex/types/TestDefinition"
// import * as tc from "astn-tokenconsumer-api"
// import * as tokAPI from "astn-tokenizer-api"
// import * as tok from "astn-tokenizer-lib"
// import { createFlattener } from "./createFlattener"
// import * as testLib from "pareto-test-lib"
// import * as fs from "pareto-filesystem-res"
// import * as diff from "pareto-diff-lib"
// import * as async from "pareto-core-async"

// export function test(): testLib.TTestSet {

//     const pLib = lib.init()


//     const tests = pc.createDictionaryBuilder<testLib.TTestElement>()

//     // function toArray<T, NT>(
//     //     dict: pa.IReadonlyDictionary<T>,
//     //     sort: (a: string, b: string) => boolean,
//     //     callback: (t: T, key: string) => NT
//     // ) {
//     //     const out: NT[] = []
//     //     dict.forEach(sort, ($, key) => {
//     //         out.push(callback($, key))
//     //     })
//     // }

//     const selectedOwnJSONTests = pl.createDictionary(ownJSONTests)
//     const selectedExtensionTests = pl.createDictionary(extensionTests)

//     // const selectedJSONTests: string[] = []
//     // const selectedExtensionTests: string[] = ["comment"]

//     function createTestFunction(
//         chunks: pt.Array<string>,
//         test: TestDefinition,
//     ): testLib.TTestElement {

//         const actualEvents: pc.Stack<EventDefinition> = pc.createStack()

//         function getRange(mustCheck: boolean | undefined, range: tokAPI.Range): TestRange | null {
//             if (mustCheck) {
//                 const end = tok.init().getEndLocationFromRange(range)
//                 return [
//                     range.start.line,
//                     range.start.column,
//                     end.line,
//                     end.column,
//                 ]
//             } else {
//                 return null
//             }
//         }
//         function getLocation(mustTest: boolean | undefined, location: tokAPI.Location): TestLocation | null {
//             if (mustTest) {
//                 return [
//                     location.line,
//                     location.column,
//                 ]
//             } else {
//                 return null
//             }
//         }

//         function createLogger(
//         ): h.ITreeHandler<tokAPI.TokenizerAnnotationData> {
//             return {
//                 onEnd: () => {
//                     actualEvents.push(["tree end", null])
//                 },
//                 root: createFlattener(
//                     ($) => {
//                         const annotation = $.annotation
//                         switch ($.token[0]) {
//                             case "header start": {
//                                 pc.panic("unexpected header")
//                                 break
//                             }
//                             case "structural": {
//                                 pl.cc($.token[1], ($) => {
//                                     switch ($.type[0]) {
//                                         case "close dictionary":
//                                             actualEvents.push(["token", "closeobject", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "close list":
//                                             actualEvents.push(["token", "closearray", getRange(test.testForLocation, annotation.range)])

//                                             break
//                                         case "close shorthand group":
//                                             actualEvents.push(["token", "closearray", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "close verbose group":
//                                             actualEvents.push(["token", "closeobject", getRange(test.testForLocation, annotation.range)])
//                                             break

//                                         case "open dictionary":
//                                             actualEvents.push(["token", "openobject", "{", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "open list":
//                                             actualEvents.push(["token", "openarray", "[", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "open shorthand group":
//                                             actualEvents.push(["token", "openarray", "<", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "open verbose group":
//                                             actualEvents.push(["token", "openobject", "(", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         case "tagged union start":
//                                             actualEvents.push(["token", "opentaggedunion", getRange(test.testForLocation, annotation.range)])
//                                             break
//                                         default:
//                                             pl.au($.type[0])
//                                     }
//                                 })
//                                 break
//                             }
//                             case "simple string": {
//                                 const data = $.token[1]
//                                 actualEvents.push(["token", "simple string", data.value, getRange(test.testForLocation, annotation.range)])
//                                 break
//                             }
//                             case "multiline string": {
//                                 const data = $.token[1]
//                                 actualEvents.push(["token", "multiline string", data.lines.join("\\n"), getRange(test.testForLocation, annotation.range)])
//                                 break
//                             }
//                             default:
//                                 pl.au($.token[0])
//                         }
//                     },
//                     () => {
//                         actualEvents.push(["tagged union end"])

//                     },
//                     () => {
//                         actualEvents.push(["missing"])
//                     },
//                     // () => {
//                     //     actualEvents.push(["tree end", null])

//                     //     return onEnd()
//                     // }
//                 )

//             }
//         }
//         const onError = ($: {
//             error: lib.TreeParserError;
//             annotation: tokAPI.TokenizerAnnotationData;
//         }) => {
//             actualEvents.push(parsingerror(lib.init().createTreeParserErrorMessage($.error), getRange(test.testForLocation, $.annotation.range)))
//         }

//         const parserLib = lib.init()

//         function createContentParser() {

//             if (test.testHeaders) {
//                 actualEvents.push(["instance data start"])
//             }
//             return parserLib.createCreateTreeParser<tokAPI.TokenizerAnnotationData>({
//                 onError: onError,
//             })({

//                 handler: createLogger(
//                     // () => {
//                     //     //actualEvents.push(["stream end", null])
//                     //     return {
//                     //         onToken: () => {
//                     //             actualEvents.push(parsingerror("unexpected data after end", null))
//                     //         },
//                     //         onEnd: () => {

//                     //         }
//                     //     }
//                     // }
//                 ),
//             })

//         }

//         const spt = tok.init().createCreateTokenizer({
//             onError: ($) => {
//                 actualEvents.push(parsingerror(tok.init().createTokenizerErrorMessage($.error), getRange(test.testForLocation, $.range)))
//             },
//         })(
//             {
//                 consumer: parserLib.createCreateHeaderParser<tokAPI.TokenizerAnnotationData>({
//                     onError: ($) => {
//                         actualEvents.push(parsingerror(lib.init().createHeaderErrorMessage($.error), getRange(test.testForLocation, $.annotation.range)))

//                     },
//                 })({
//                     handler: {
//                         onNoInternalSchema: () => {
//                             return createContentParser()
//                         },
//                         onEmbeddedSchema: (_schemaSchemaName) => {
//                             actualEvents.push(["token", "schema data start"])
//                             const logger = createLogger(
//                             )
//                             let tp = parserLib.createCreateTreeParser<tokAPI.TokenizerAnnotationData>({
//                                 onError: onError,
//                             })({
//                                 handler: {
//                                     root: logger.root,
//                                     onEnd: () => {
//                                         //actualEvents.push(["tree end", null])
//                                         logger.onEnd()
//                                         tp = createContentParser()
//                                     }
//                                 },
//                             })
//                             return {
//                                 onToken: ($) => {
//                                     tp.onToken($)
//                                 },
//                                 onEnd: ($) => {
//                                     tp.onEnd($)
//                                 }
//                             }
//                         },
//                         onSchemaReference: ($$) => {
//                             actualEvents.push(["token", "schema data start"])
//                             actualEvents.push(["token", "simple string", $$.token.token.value, getRange(test.testForLocation, $$.token.annotation.range)])
//                             // if (test.testHeaders) {
//                             //     actualEvents.push(["instance data start"])
//                             // }
//                             return createContentParser()
//                         },
//                         // onBody: () => {
//                         //     if (test.testHeaders) {
//                         //         actualEvents.push(["instance data start"])
//                         //     }
//                         //     return x
//                         // },
//                     },
//                 }),
//             }
//         )
//         chunks.forEach(($) => {
//             spt.onData($)
//         })
//         spt.onEnd()
//         actualEvents.push(["stream end", null])



//         //console.log(JSON.stringify(actualEvents))
//         // console.log(JSON.stringify(test.events))
//         // $ts.assertEqual(actualEvents, test.events)
//         //const expectedFormattedText = test.formattedText ? test.formattedText : test.text

//         // if (!test.skipRoundTripCheck) {
//         //     chai.assert.equal("roundtrip:\n" + out.join(""), "roundtrip:\n" + chunks.join("")
//         //         .replace(/\r\n/g, "\n")
//         //         .replace(/\n\r/g, "\n")
//         //         .replace(/\r/g, "\n")
//         //     )
//         // }
//         // chai.assert.equal(
//         //     "formatted:\n" + formattedText
//         //         .replace(/\r\n/g, "\n")
//         //         .replace(/\n\r/g, "\n")
//         //         .replace(/\r/g, "\n"),
//         //     "formatted:\n" + expectedFormattedText
//         // )

//         const parts = testLib.$.diff(
//             JSON.stringify(test.events, undefined, "\t"),
//             JSON.stringify(actualEvents, undefined, "\t")
//         )
//         let success = true
//         parts.forEach(($) => {
//             success = false
//         })
//         return {
//             type: ["test", {
//                 success: success,
//                 type: ["large string", {
//                     parts: parts
//                     // expected: JSON.stringify(test.events, undefined, "\t"),
//                     // actual: JSON.stringify(actualEvents, undefined, "\t"),
//                 }]
//             }]
//         }
//     }

//     // createRootTestSet(($ts) => {


//     //     $ts.subset('astn', ($ts) => {
//     //         $ts.subset('#strictJSON', ($ts) => {
//     //             selectedOwnJSONTests.forEach(() => true, (test, key) => {
//     //                 createTestFunction(
//     //                     '[' + key + '] should be able to parse -> one chunk',
//     //                     [test.text],
//     //                     test,
//     //                     $ts,
//     //                 )
//     //                 createTestFunction(
//     //                     '[' + key + '] should be able to parse -> every character is a chunck',

//     //                     test.text.split(''),
//     //                     test,
//     //                     $ts,
//     //                 )
//     //             })
//     //         })
//     //         $ts.subset('#extensions', ($ts) => {
//     //             selectedExtensionTests.forEach(() => true, (test, key) => {
//     //                 createTestFunction(
//     //                     '[' + key + '] should be able to parse -> one chunk',
//     //                     [test.text],
//     //                     test,
//     //                     $ts,
//     //                 )
//     //                 createTestFunction(
//     //                     '[' + key + '] should be able to parse -> every character is a chunck',
//     //                     test.text.split(''),
//     //                     test,
//     //                     $ts,
//     //                 )
//     //             })
//     //         });

//     //         $ts.subset('#pre-chunked', ($ts) => {
//     //             selectedOwnJSONTests.forEach(() => true, (test, key) => {
//     //                 if (!test.chunks) return;
//     //                 createTestFunction(
//     //                     '[' + key + '] should be able to parse pre-chunked',
//     //                     test.chunks,
//     //                     test,
//     //                     $ts,
//     //                 )
//     //             })
//     //         });
//     //     });
//     // })


//     function create(
//         tests: pt.Dictionary<TestDefinition>
//     ): testLib.TTestElement {
//         return {
//             type: ["subset", {
//                 elements: tests.map(($, key) => {
//                     return createTestFunction(
//                         pl.createArray([$.text]),
//                         $
//                     )
//                 })
//             }]
//         }

//     }
//     return {
//         elements: pl.createDictionary({
//             '#strictJSON': create(selectedOwnJSONTests),
//             '#ASTN-extension': create(selectedExtensionTests),
//         })
//     }


// }