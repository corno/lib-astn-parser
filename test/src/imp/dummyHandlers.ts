import * as grammar from "astn-handlers-api"

export function createDummyRequiredValueHandler<Annotation>(
): grammar.IRequiredValueHandler<Annotation> {
    return {
        exists: createDummyValueHandler(),
        missing: () => {

            //throw new Error("!!!!!#$")
         },
    }
}

export function createDummyValueHandler<Annotation>(
): grammar.IValueHandler<Annotation> {
    return {
        array: () => createDummyArrayHandler(),
        object: () => createDummyObjectHandler(),
        simpleString: () => { },
        multilineString: () => { },
        taggedUnion: () => createDummyTaggedUnionHandler(),
    }
}

export function createDummyTaggedUnionHandler<Annotation>(
): grammar.ITaggedUnionHandler<Annotation> {
    return {
        option: () => createDummyRequiredValueHandler(),
        missingOption: () => createDummyRequiredValueHandler(),
        end: () => { },
    }
}

export function createDummyArrayHandler<Annotation>(
): grammar.IArrayHandler<Annotation> {
    return {
        element: () => createDummyValueHandler(),
        onEnd: () => { },
    }
}

export function createDummyObjectHandler<Annotation>(
): grammar.IObjectHandler<Annotation> {
    return {
        property: () => {
            return createDummyRequiredValueHandler()
        },
        anonymousProperty: () => {
            return createDummyValueHandler()
        },
        onEnd: () => { },
    }
}

