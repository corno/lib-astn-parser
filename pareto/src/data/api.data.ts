import * as pr from 'pareto-core-raw'

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

import { $ as glossary } from "./glossary.data"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': glossary,
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createCreateHeaderParser": algorithm(definitionReference("X")),
            "createHeaderParserErrorMessage": algorithm(definitionReference("CreateHeaderParserErrorMessage")),
            "createTreeParser": algorithm(definitionReference("X")),
            "createTreeParserErrorMessage": algorithm(definitionReference("CreateTreeParserErrorMessage")),
        })
    },
}
