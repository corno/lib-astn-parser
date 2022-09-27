

// import * as pb from "pareto-core-exe"
// import * as pl from "pareto-core-lib"
// import * as pa from "pareto-core-async"

// import * as fsLib from "pareto-filesystem-lib"

// import * as toklib from "astn-tokenizer-lib"
// import * as testLib from "pareto-test-lib"

// import { getTests } from "../implementation/getTests"
// import * as lib from "../../../pub/dist"

// import { test } from "../implementation/index3"



// pb.runProgram(
//     ($) => {
//         if ($.argument === undefined) {
//             pl.panic("missing path")
//         }
//         const path = $.argument

//         const tok = toklib.init()


//         const hfs = fsLib.$.createHandledFilesystem(
//             ($) => {
//                 pl.implementMe(`FS ERROR: ${$.path}`)
//             }
//         )

//         pa.tuple2<testLib.TTestSet, testLib.TTestSet, testLib.TTestResult>(
//             getTests(
//                 path,
//                 hfs,
//                 tok.createCreateTokenizer,
//                 lib.$.createCreateTreeParser,
//             ),
//             pa.value(
//                 test()
//             ),
//             ($) => {
//                 return {
//                     root: {
//                         elements: pl.createDictionary<testLib.TTestElement>({
//                             "x": {
//                                 type: ["subset", $.first]
//                             },
//                             "y": {
//                                 type: ["subset", $.second]
//                             },
//                         })
//                     }
//                 }
//             }
//         ).execute(($) => {

//             testLib.$.serializeTestResult(
//                 {
//                     testResult: $,
//                     showSummary: true,

//                 },
//                 {
//                     log: (str) => {
//                         const out = pb.createStdOut()
//                         out.write(str)
//                         out.write(`\n`)
//                     }
//                 }
//             )
//         })
//     }
// )
