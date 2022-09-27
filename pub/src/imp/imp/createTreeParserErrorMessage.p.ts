import * as pl from "pareto-core-lib"

import * as inf from "../../interface"

export function createTreeParserErrorMessage(error: inf.TreeParserError): string {
    switch (error[0]) {
        case "missing array close": {
            return error[0]
        }
        case "missing object close": {
            return error[0]
        }
        case "missing key": {
            return error[0]
        }
        case "missing option": {
            return error[0]
        }
        case "missing value": {
            return error[0]
        }
        case "missing tagged union option and value": {
            return error[0]
        }
        case "unexpected data after end": {
            return error[0]
        }
        case "unexpected end of array": {
            return error[0]
        }
        case "unexpected header start": {
            return error[0]
        }
        case "unexpected end of text": {
            const $ = error[1]
            return `unexpected end of text, still in ${$["still in"][0]}`
        }
        case "unexpected end of object": {
            return error[0]
        }
        default:
            return pl.au(error[0])
    }
}