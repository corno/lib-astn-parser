import * as tc from "api-astn-tokenconsumer"
import * as h from "api-astn-handlers"

export type IHeaderHandler<PAnnotation> = {
    readonly "onEmbeddedSchema": ($: {
        readonly "headerAnnotation": PAnnotation
        readonly "embeddedSchemaAnnotation": PAnnotation
        readonly "schemaSchemaReferenceToken": h.TSimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    readonly "onSchemaReference": ($: {
        readonly "headerAnnotation": PAnnotation
        readonly "token": h.TSimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    readonly "onNoInternalSchema": () => tc.ITokenConsumer<PAnnotation>
}