// import * as grammar from "api-astn-handlers"

// export function createDummyRequiredValueHandler<PAnnotation>(
// ): grammar.IRequiredValueHandler<PAnnotation> {
//     return {
//         exists: createDummyValueHandler(),
//         missing: () => {

//             //throw new Error("!!!!!#$")
//          },
//     }
// }

// export function createDummyValueHandler<PAnnotation>(
// ): grammar.IValueHandler<PAnnotation> {
//     return {
//         array: () => createDummyArrayHandler(),
//         object: () => createDummyObjectHandler(),
//         simpleString: () => { },
//         multilineString: () => { },
//         taggedUnion: () => createDummyTaggedUnionHandler(),
//     }
// }

// export function createDummyTaggedUnionHandler<PAnnotation>(
// ): grammar.ITaggedUnionHandler<PAnnotation> {
//     return {
//         option: () => createDummyRequiredValueHandler(),
//         missingOption: () => createDummyRequiredValueHandler(),
//         end: () => { },
//     }
// }

// export function createDummyArrayHandler<PAnnotation>(
// ): grammar.IArrayHandler<PAnnotation> {
//     return {
//         element: () => createDummyValueHandler(),
//         onEnd: () => { },
//     }
// }

// export function createDummyObjectHandler<PAnnotation>(
// ): grammar.IObjectHandler<PAnnotation> {
//     return {
//         property: () => {
//             return createDummyRequiredValueHandler()
//         },
//         anonymousProperty: () => {
//             return createDummyValueHandler()
//         },
//         onEnd: () => { },
//     }
// }

