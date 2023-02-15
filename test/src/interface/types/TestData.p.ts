import * as pt from 'pareto-core-types'

import { TTestDefinitions } from "./TestDefinition.p";

export type TTestData = pt.Dictionary<{
    'definitions': TTestDefinitions,
    'type':
    | ['json', null]
    | ['astn', null]
}>