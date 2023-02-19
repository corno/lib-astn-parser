
// import * as pl from 'pareto-core-lib'
// import * as pt from 'pareto-core-types'
// import * as tok from "astn-tokenizer-lib"
// import * as lib from "../../../../pub/dist"

// //import { IHandledReadFilesystem } from "pareto-filesystem-lib"
// import * as test from "pareto-test-lib"
// import * as async from "pareto-core-async"
// import { createDummyRequiredValueHandler } from "./dummyHandlers"
// import { testJSONTestSuite, TestSet } from "./JSONTestSuite/JSONTestSuite"


// export function getTests(
//     path: string,
//     fs: IHandledFilesystem,
//     createCreateTokenizer: tok.CreateCreateTokenizer,
//     createCreateTreeParser: lib.CreateCreateTreeParser,
// ): pt.AsyncValue<test.TTestSet> {

//     return async.rewrite(

//         testJSONTestSuite(
//             `${path}/JSONTestSuite`,
//             fs,
//         ),
//         ($) => {

//             function testSet(
//                 set: TestSet,
//                 expectErrors: boolean,
//             ): test.TTestSet {
//                 return {
//                     elements: set.tests.map<test.TTestElement>(($) => {
//                         let foundErrors = false

//                         const parser = createCreateTreeParser({
//                             onError: ($) => {
//                                 if (!expectErrors) {
//                                     pv.logDebugMessage(`>>> ${JSON.stringify($, undefined, `\t`)}`)
//                                 }
//                                 foundErrors = true
//                             }
//                         })({
//                             handler: {
//                                 root: createDummyRequiredValueHandler(),
//                                 onEnd: () => { }
//                             },
//                         })
//                         const spt = createCreateTokenizer({
//                             onError: () => {
//                                 if (!expectErrors) {
//                                     pv.logDebugMessage(`YYYY`)
//                                 }
//                                 foundErrors = true
//                             },
//                         })({
//                             consumer: parser,
//                         })
//                         spt.onData($)
//                         spt.onEnd()
//                         // if (foundErrors !== expectErrors) {
//                         //     pv.logDebugMessage(`error in ${$.key} (${set.path}/${$.key})`)
//                         // }
//                         return {
//                             type: ["test", {
//                                 success: foundErrors === expectErrors,
//                                 type: ["boolean", null]
//                             }]
//                         }
//                     })
//                 }
//             }
//             const jsonTests: test.TTestSet = {
//                 elements: pl.createDictionary({
//                     "parsing_i": {
//                         type: ["subset", testSet(
//                             $.test_parsing.i,
//                             false,
//                         )]
//                     },
//                     "parsing_n": {
//                         type: ["subset", testSet(
//                             $.test_parsing.n,
//                             true,
//                         )]
//                     },
//                     "parsing_y": {
//                         type: ["subset", testSet(
//                             $.test_parsing.y,
//                             false,
//                         )]
//                     },
//                     "transform": {
//                         type: ["subset", testSet(
//                             $.test_transform,
//                             false,
//                         )]
//                     }
//                 })
//             }
//             return jsonTests
//         }
//     )
// }