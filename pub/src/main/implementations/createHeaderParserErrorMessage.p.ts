import * as pl from "pareto-core-lib"

import * as api from "../api"

export const $$: api.CcreateHeaderParserErrorMessage = ($) => {
    switch ($[0]) {
        case "expected an embedded schema": {
            return `expected an embedded schema`
        }
        case "expected a schema schema reference": {
            return `expected a schema schema reference`
        }
        case "expected the schema start (!) or root value": {
            return `expected the schema start (!) or root value`
        }
        case "expected a schema reference or an embedded schema": {
            return `expected a schema reference or an embedded schema`
        }
        default:
            return pl.au($[0])
    }
}
