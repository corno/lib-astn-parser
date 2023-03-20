import * as pd from 'pareto-core-data'

import {
    external,
    this_
} from "lib-pareto-typescript-project/dist/submodules/project/shorthands"


import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as glossary } from "./glossary.data"
import { $ as api } from "./api.data"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "common": external("glo-pareto-common"),
                "tc": external("glo-astn-tokenconsumer"),
                "h": external("glo-astn-handlers"),
            }),
        },
        'api': {
            'root': api,
            'imports': d({
                "common": external("glo-pareto-common"),
                "this": this_(),
            }),
        },
    },
    'implementation': ['typescript', null],
}