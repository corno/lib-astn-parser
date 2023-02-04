import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"

export namespace GHeaderParserError {
    
    export namespace Oexpected__a__schema__reference__or__an__embedded__schema {}
    export type Oexpected__a__schema__reference__or__an__embedded__schema = {}
    
    export namespace Oexpected__a__schema__schema__reference {}
    export type Oexpected__a__schema__schema__reference = {}
    
    export namespace Oexpected__an__embedded__schema {}
    export type Oexpected__an__embedded__schema = {}
    
    export namespace Oexpected__the__schema__start___po_ex_pc__or__root__value {}
    export type Oexpected__the__schema__start___po_ex_pc__or__root__value = {}
}
export type GHeaderParserError = 
    | ['expected a schema reference or an embedded schema', GHeaderParserError.Oexpected__a__schema__reference__or__an__embedded__schema]
    | ['expected a schema schema reference', GHeaderParserError.Oexpected__a__schema__schema__reference]
    | ['expected an embedded schema', GHeaderParserError.Oexpected__an__embedded__schema]
    | ['expected the schema start (!) or root value', GHeaderParserError.Oexpected__the__schema__start___po_ex_pc__or__root__value]
export type UHeaderParserError = GHeaderParserError

export namespace GTreeParserError {
    
    export namespace Omissing__array__close {}
    export type Omissing__array__close = {}
    
    export namespace Omissing__key {}
    export type Omissing__key = {}
    
    export namespace Omissing__object__close {}
    export type Omissing__object__close = {}
    
    export namespace Omissing__option {}
    export type Omissing__option = {}
    
    export namespace Omissing__tagged__union__option__and__value {}
    export type Omissing__tagged__union__option__and__value = {}
    
    export namespace Omissing__value {}
    export type Omissing__value = {}
    
    export namespace Ounexpected__data__after__end {}
    export type Ounexpected__data__after__end = {}
    
    export namespace Ounexpected__end__of__array {}
    export type Ounexpected__end__of__array = {}
    
    export namespace Ounexpected__end__of__object {}
    export type Ounexpected__end__of__object = {}
    
    export namespace Ounexpected__end__of__text {
        
        export namespace Pstill__in {
            
            export namespace Oarray {}
            export type Oarray = {}
            
            export namespace Oobject {}
            export type Oobject = {}
            
            export namespace Otagged__union {}
            export type Otagged__union = {}
        }
        export type Pstill__in = 
            | ['array', Pstill__in.Oarray]
            | ['object', Pstill__in.Oobject]
            | ['tagged union', Pstill__in.Otagged__union]
    }
    export type Ounexpected__end__of__text = {
        readonly 'still in': Ounexpected__end__of__text.Pstill__in
    }
    
    export namespace Ounexpected__header__start {}
    export type Ounexpected__header__start = {}
}
export type GTreeParserError = 
    | ['missing array close', GTreeParserError.Omissing__array__close]
    | ['missing key', GTreeParserError.Omissing__key]
    | ['missing object close', GTreeParserError.Omissing__object__close]
    | ['missing option', GTreeParserError.Omissing__option]
    | ['missing tagged union option and value', GTreeParserError.Omissing__tagged__union__option__and__value]
    | ['missing value', GTreeParserError.Omissing__value]
    | ['unexpected data after end', GTreeParserError.Ounexpected__data__after__end]
    | ['unexpected end of array', GTreeParserError.Ounexpected__end__of__array]
    | ['unexpected end of object', GTreeParserError.Ounexpected__end__of__object]
    | ['unexpected end of text', GTreeParserError.Ounexpected__end__of__text]
    | ['unexpected header start', GTreeParserError.Ounexpected__header__start]
export type UTreeParserError = GTreeParserError