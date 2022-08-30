import * as tc from "astn-tokenconsumer-api"
import * as h from "astn-handlers-api"


export type IHeaderHandler<Annotation> = {
    onEmbeddedSchema: ($: {
        headerAnnotation: Annotation
        embeddedSchemaAnnotation: Annotation
        schemaSchemaReferenceToken: h.SimpleStringToken<Annotation>
    }) => tc.ITokenConsumer<Annotation>
    onSchemaReference: ($: {
        headerAnnotation: Annotation
        token: h.SimpleStringToken<Annotation>
    }) => tc.ITokenConsumer<Annotation>
    onNoInternalSchema: ($: { }) => tc.ITokenConsumer<Annotation>
}