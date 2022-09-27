export type TTestRange = [number?, number?, number?, number?]
export type TTestLocation = [number?, number?]

export type TEventDefinition =
    | ["token", "simple string", string, TTestRange | null]
    | ["token", "multiline string", string, TTestRange | null]
    | ["token", "openarray", string | null, TTestRange | null]
    | ["token", "closearray", TTestRange | null]
    | ["token", "openobject", string | null, TTestRange | null]
    | ["token", "closeobject", TTestRange | null]
    | ["token", "opentaggedunion", TTestRange | null]
    | ["token", "linecomment", string, TTestRange | null]
    | ["token", "blockcomment", string, TTestRange | null]
    | ["parsingerror", string, TTestRange | null]
    | ["token", "schema data start", TTestRange?]
    | ["stream end", null]
    | ["instance data start"]
    | ["validationerror", string]
    | ["tree end", null]
    | ["tagged union end"]
    | ["missing"]
// [AnyEvent, string?, number?, number?]

export type TTestDefinition = {
    readonly skipRoundTripCheck?: boolean
    readonly text: string
    readonly testHeaders?: boolean
    readonly testForLocation?: boolean
    readonly chunks?: string[]
    readonly events: TEventDefinition[]
    readonly formattedText?: string
}

export type TTestDefinitions = {
    readonly [key: string]: TTestDefinition
}