import * as h from "api-astn-handlers"
import * as tc from "api-astn-tokenconsumer"
import { IHeaderHandler } from "../interfaces/IHeaderHandler.p"

import { THeaderError } from "../types/HeaderError.p"
import { TTreeParserError } from "../types/TreeParserError.p"

export type FCreateCreateHeaderParser = <PAnnotation>(
    $i: {
        readonly "onError": ($: {
            readonly "error": THeaderError
            readonly "annotation": PAnnotation
        }) => void
    }
) => FCreateHeaderParser<PAnnotation>

export type FCreateCreateTreeParser = <PAnnotation>(
    $i: {
        readonly "onError": ($: {
            readonly "error": TTreeParserError
            readonly "annotation": PAnnotation
        }) => void
    }

) => FCreateTreeParser<PAnnotation>

export type FCreateHeaderParser<PAnnotation> = (
    $i: {
        readonly "handler": IHeaderHandler<PAnnotation>
    }
) => tc.ITokenConsumer<PAnnotation>

export type FCreateTreeParser<PAnnotation> = (
    $p: {
        readonly "handler": h.ITreeHandler<PAnnotation>
    }

) => tc.ITokenConsumer<PAnnotation>
