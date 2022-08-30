
import * as ap from "astn-tokenconsumer-api"

export type CreateHeaderParser <Annotation> =(
    $i: {
        handler: IHeaderHandler<Annotation>
    }
) => ap.ITokenConsumer<Annotation>

import * as h from "astn-handlers-api"
import { IHeaderHandler } from "./interfaces/IHeaderHandler"

export type CreateTreeParser <Annotation> =(
    $p: {
        handler: h.ITreeHandler<Annotation>
    }
    
) => ap.ITokenConsumer<Annotation>
