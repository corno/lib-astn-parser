import * as pt from "pareto-core-types"
import * as pa from "pareto-core-async"

import * as hfs from "pareto-handledfilesystem-api"

export type TestSet = {
    path: string
    tests: pt.Dictionary<string>
}

export type JSONTestSuite = {
    test_parsing: {
        i: TestSet,
        n: TestSet,
        y: TestSet,
    }
    test_transform: TestSet
}

export function testJSONTestSuite(
    path: string,
    fs: IHandledFilesystem,
): pt.AsyncValue<JSONTestSuite> {

    function readDir(
        relativePath: string,
    ): pt.AsyncValue<TestSet> {
        return pa.rewrite(
            fs.directory(
                [path, relativePath],
                (data) => {
                    return fs.file(
                        [data.path],
                        (fileData) => {
                            return pa.value(fileData)
                        }
                    )
                }
            ),
            ($) => {
                return {
                    path: `${path}/${relativePath}`,
                    tests: $,
                }
            }
        )
    }
    return pa.tuple2(
        pa.tuple3(
            readDir("test_parsing/i"),
            readDir("test_parsing/n"),
            readDir("test_parsing/y"),
            ($) => {
                return {
                    i: $.first,
                    n: $.second,
                    y: $.third,
                }
            }
        ),
        readDir("test_transform"),
        ($) => {
            return {
                test_parsing: $.first,
                test_transform: $.second,
            }
        },
    )
}