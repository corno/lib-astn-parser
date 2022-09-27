

export type TTreeParserError =
    | ["missing array close", null]
    | ["missing key", null]
    | ["missing object close", null]
    | ["missing option", null]
    | ["missing value", null]
    | ["missing tagged union option and value", null]
    | ["unexpected data after end", null]
    | ["unexpected header start", null]
    | ["unexpected end of array", null]
    | ["unexpected end of object", null]
    | ["unexpected end of text", {
        readonly "still in":
        | ["array", null]
        | ["object", null]
        | ["tagged union", null]
    }]
