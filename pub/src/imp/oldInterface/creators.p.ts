
import * as ap from "astn-tokenconsumer-api"

export type CreateHeaderParser <PAnnotation> =(
    $i: {
        handler: IHeaderHandler<PAnnotation>
    }
) => ap.ITokenConsumer<PAnnotation>

import * as h from "astn-handlers-api"
import { IHeaderHandler } from "./interfaces/IHeaderHandler"

export type CreateTreeParser <PAnnotation> =(
    $p: {
        handler: h.ITreeHandler<PAnnotation>
    }
    
) => ap.ITokenConsumer<PAnnotation>
