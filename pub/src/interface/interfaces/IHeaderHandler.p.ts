import * as tc from "glo-astn-tokenconsumer"
import * as h from "glo-astn-handlers"

export type IHeaderHandler<PAnnotation> = {
    readonly "onEmbeddedSchema": ($: {
        readonly "headerAnnotation": PAnnotation
        readonly "embeddedSchemaAnnotation": PAnnotation
        readonly "schemaSchemaReferenceToken": h.T.SimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    readonly "onSchemaReference": ($: {
        readonly "headerAnnotation": PAnnotation
        readonly "token": h.T.SimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    readonly "onNoInternalSchema": () => tc.ITokenConsumer<PAnnotation>
}