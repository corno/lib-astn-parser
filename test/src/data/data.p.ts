import { extensionTests } from "./ASTNTestSet.p"
import { ownJSONTests } from "./ownJSONTestset.p"

import * as api from "../interface"

export const data: api.TTestData = {
    "ASTN": extensionTests,
    "own": ownJSONTests,
}