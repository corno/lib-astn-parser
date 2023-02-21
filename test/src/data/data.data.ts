import * as pr from 'pareto-core-data'

import { $ as extensionTests } from "./ASTNTestSet.data"
import { $ as ownJSONTests } from "./ownJSONTestset.data"

import * as api from "../glossary"

export const $: api.T.TestData = pr.d({
    "ASTN": {
        'definitions': extensionTests,
        'type': ['astn', {}],
    },
    "own": {
        'definitions': ownJSONTests,
        'type': ['json', {}],
    },
})