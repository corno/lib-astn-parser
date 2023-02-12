import * as pl from 'pareto-core-lib'

import * as api from "../api"

export const $$: api.CcreateTreeParserErrorMessage = ($) => {
    switch ($[0]) {
        case "missing array close": {
            return $[0]
        }
        case "missing object close": {
            return $[0]
        }
        case "missing key": {
            return $[0]
        }
        case "missing option": {
            return $[0]
        }
        case "missing value": {
            return $[0]
        }
        case "missing tagged union option and value": {
            return $[0]
        }
        case "unexpected data after end": {
            return $[0]
        }
        case "unexpected end of array": {
            return $[0]
        }
        case "unexpected header start": {
            return $[0]
        }
        case "unexpected end of text": {
            return pl.cc($[1], ($) => {
                return `unexpected end of text, still in ${$["still in"][0]}`
            })
        }
        case "unexpected end of object": {
            return $[0]
        }
        default:
            return pl.au($[0])
    }
}