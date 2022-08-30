

export type TreeParserError =
    | ["missing array close", {}]
    | ["missing key", {}]
    | ["missing object close", {}]
    | ["missing option", {}]
    | ["missing value", {}]
    | ["missing tagged union option and value", {}]
    | ["unexpected data after end", {}]
    | ["unexpected header start", {}]
    | ["unexpected end of array", {}]
    | ["unexpected end of object", {}]
    | ["unexpected end of text", {
        readonly "still in":
        | ["array", {}]
        | ["object", {}]
        | ["tagged union", {}]
    }]
