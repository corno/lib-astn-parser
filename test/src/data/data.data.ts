import * as pr from 'pareto-core-raw'

import { $ as extensionTests } from "./ASTNTestSet.data"
import { $ as ownJSONTests } from "./ownJSONTestset.data"

import * as api from "../interface"

export const data: api.TTestData = pr.wrapRawDictionary({
    "ASTN": {
        'definitions': extensionTests,
        'type': ['astn', null],
    },
    "own": {
        'definitions': ownJSONTests,
        'type': ['json', null],
    },
})