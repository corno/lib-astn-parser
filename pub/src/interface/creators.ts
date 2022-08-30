import * as h from "astn-handlers-api"
import * as tc from "astn-tokenconsumer-api"
import { IHeaderHandler } from "./interfaces/IHeaderHandler"

import { HeaderError } from "./types/HeaderError"
import { TreeParserError } from "./types/TreeParserError"

export type CreateCreateHeaderParser = <Annotation>(
    $i: {
        onError: ($: {
            error: HeaderError
            annotation: Annotation
        }) => void
    }
) => CreateHeaderParser<Annotation>

export type CreateCreateTreeParser = <Annotation>(
    $i: {
        onError: ($: {
            error: TreeParserError
            annotation: Annotation
        }) => void
    }
    
) => CreateTreeParser<Annotation>

export type CreateCreateHeaderParserWithSerializedError = <Annotation>(
    $i: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
) => CreateHeaderParser<Annotation>

export type CreateCreateTreeParserWithSerializedError = <Annotation>(
    $i: {
        onError: (
            $: {
                error: string,
                annotation: Annotation,
            }
        ) => void
    },
    
) => CreateTreeParser<Annotation>


export type CreateHeaderParser <Annotation> =(
    $i: {
        handler: IHeaderHandler<Annotation>
    }
) => tc.ITokenConsumer<Annotation>

export type CreateTreeParser <Annotation> =(
    $p: {
        handler: h.ITreeHandler<Annotation>
    }
    
) => tc.ITokenConsumer<Annotation>
