import * as pd from 'pareto-core-data'

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as gmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pd.d

export const $: gmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': glossary,
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createHeaderParser": algorithm(definitionReference("CreateHeaderParser"), constructor(null, {

            })),
            "createHeaderParserErrorMessage": algorithm(definitionReference("CreateHeaderParserErrorMessage")),
            "createTreeParser": algorithm(definitionReference("CreateTreeParser"), constructor(null, {
                
            })),
            "createTreeParserErrorMessage": algorithm(definitionReference("CreateTreeParserErrorMessage")),
        })
    },
}
