import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d

import { $ as main } from "./main/module.data"
import { $ as testGlossary } from "./test/glossary.data"

import { external, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

export const $: g_project.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the ASTN parser",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "glo-astn-tokenconsumer": null,
        "glo-astn-handlers": null,
    }),
    'type': ['library', {
        'main': main,
        'submodules': d({
        }),
        'bindings': [false],
        'executables': d({}),
        'test': {
            'dependencies': d({
                "lib-astn-dummyhandlers": null,
            }),
            'definition': {
                'glossary': {
                    'root': testGlossary,
                    'imports': d({}),
                },
                'api': {
                    'root': {
                        'algorithms': d({}),
                    },
                    'imports': d({}),
                },
            },
            'imports': d({}),
        }
    }],
}