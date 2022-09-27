import * as h from "astn-handlers-api"
import * as tc from "astn-tokenconsumer-api"
import { IHeaderHandler } from "./interfaces/IHeaderHandler"

import { HeaderError } from "./types/HeaderError"
import { TreeParserError } from "./types/TreeParserError"

export type CreateCreateHeaderParser = <PAnnotation>(
    $i: {
        onError: ($: {
            error: HeaderError
            annotation: Annotation
        }) => void
    }
) => CreateHeaderParser<PAnnotation>

export type CreateCreateTreeParser = <PAnnotation>(
    $i: {
        onError: ($: {
            error: TreeParserError
            annotation: Annotation
        }) => void
    }
    
) => CreateTreeParser<PAnnotation>

export type CreateCreateHeaderParserWithSerializedError = <PAnnotation>(
    $i: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
) => CreateHeaderParser<PAnnotation>

export type CreateCreateTreeParserWithSerializedError = <PAnnotation>(
    $i: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
    
) => CreateTreeParser<PAnnotation>


export type CreateHeaderParser <PAnnotation> =(
    $i: {
        handler: IHeaderHandler<PAnnotation>
    }
) => tc.ITokenConsumer<PAnnotation>

export type CreateTreeParser <PAnnotation> =(
    $p: {
        handler: h.ITreeHandler<PAnnotation>
    }
    
) => tc.ITokenConsumer<PAnnotation>
