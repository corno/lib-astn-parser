import * as pd from 'pareto-core-data'

import { constructor, algorithm, sfunction } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "createHeaderParser": algorithm(constructor("this", {}, "CreateHeaderParser"), { "Annotation": "Annotation" }),
        "createHeaderParserErrorMessage": algorithm(sfunction("this", {}, "CreateHeaderParserErrorMessage"), { "Annotation": "Annotation" }),
        "createTreeParser": algorithm(constructor("this", {}, "CreateTreeParser"), { "Annotation": "Annotation" }),
        "createTreeParserErrorMessage": algorithm(sfunction("this", {}, "CreateTreeParserErrorMessage"), { "Annotation": "Annotation" }),
    }),
}