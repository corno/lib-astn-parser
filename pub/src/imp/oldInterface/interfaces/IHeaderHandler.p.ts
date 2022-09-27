import * as tc from "astn-tokenconsumer-api"
import * as h from "astn-handlers-api"


export type IHeaderHandler<PAnnotation> = {
    onEmbeddedSchema: ($: {
        headerAnnotation: Annotation
        embeddedSchemaAnnotation: Annotation
        schemaSchemaReferenceToken: h.SimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    onSchemaReference: ($: {
        headerAnnotation: Annotation
        token: h.SimpleStringToken<PAnnotation>
    }) => tc.ITokenConsumer<PAnnotation>
    onNoInternalSchema: ($: { }) => tc.ITokenConsumer<PAnnotation>
}