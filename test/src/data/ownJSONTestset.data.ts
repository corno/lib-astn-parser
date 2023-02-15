import * as pr from 'pareto-core-raw'

import * as api from "../interface"
import {
    openTaggedUnion,
    openAngleBracket,
    schemaDataStart,
    simpleString,
    openCurly,
    openBrace,
    closeArray,
    closeObject,
    instanceDataStart,
    missing,
    parsingerror,
    streamEnd,
    taggedUnionEnd,
    test,
    treeEnd,
} from "../interface/shorthands.p"

const d = pr.wrapRawDictionary


export const $: api.TTestDefinitions = d({
    "empty": test(
        ``,
        [
            parsingerror("expected the schema start (!) or root value"),
            streamEnd(),
        ],
    ),
    "empty instance data": test(
        `! "x"`,
        [
            schemaDataStart(),
            simpleString("x"),
            parsingerror("missing value"),
            missing(),
            streamEnd(),
        ],
    ),
    "single key": test(
        `{ "foo" }`,
        [
            //parsingerror("expected the schema start (!) or root value", null),            openCurly(),
            simpleString("foo"),
            parsingerror("missing value"),
            missing(),
            closeObject(),
            treeEnd(),
            streamEnd()
        ],
    ),
    "just a string": test(
        `"a string"`,
        [
            simpleString("a string"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "unterminated string": test(
        `"an unterminated string`,
        [
            parsingerror("unterminated string"),
            simpleString("an unterminated string"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "newline": test(
        `\n  "a string after a newline"`,
        [
            simpleString("a string after a newline"),
            treeEnd(),
            streamEnd(),
        ],
        //   formattedText: '\n  "a string after a newline"',
    ),
    "just a number": test(
        `42`,
        [
            simpleString("42"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "invalid number": test(
        `42x`,
        [
            simpleString("42x"),
            //["validationerror", "Invalid number, unexpected character x in '42x'"],
            treeEnd(),
            streamEnd(),
        ],
    ),
    "empty array": test(
        `[ ]`,
        [
            openBrace(),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "just slash": test(
        `[ "\\\\" ]`,
        [
            openBrace(),
            simpleString("\\"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "zero byte": test(
        `{ "foo": "\\u0000" }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("\u0000"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "empty value": test(
        `{ "foo": "" }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString(""),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "missing key": test(
        `{ { } }`,
        [
            openCurly(),
            parsingerror("missing key"),
            openCurly(),
            closeObject(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "wrong close": test(
        `{ ]`,
        [
            openCurly(),
            parsingerror("missing object close"),
            // openCurly(),
            // closeObject(),
            // closeObject(),
            treeEnd(),
            parsingerror("unexpected data after end"),
            streamEnd(),
        ],
    ),
    "empty key": test(
        `{ "foo": "bar", "": "baz" }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("bar"),
            simpleString(""),
            simpleString("baz"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    // "invalid key": test(
    //     text: '{ "foo": "bar", { }: "baz" }',
    //     events: [
    //         openCurly(),
    //         simpleString("foo"),
    //         simpleString("bar"),
    //         //missing(),
    //         parsingerror("missing key", null),
    //         simpleString("baz"),
    //         //missing(),
    //         parsingerror("missing value", null),
    //         closeObject(),
    //         treeEnd(), 
    //         streamEnd(),
    //     ],
    // },
    "three byte utf8": test(
        `{ "matzue": "松江", "asakusa": "浅草" }`,
        [
            openCurly(),
            simpleString("matzue"),
            simpleString("松江"),
            simpleString("asakusa"),
            simpleString("浅草"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "four byte utf8": test(
        `{ "U+10ABCD": "������" }`,
        [
            openCurly(),
            simpleString("U+10ABCD"),
            simpleString("������"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "bulgarian": test(
        `[ "Да Му Еба Майката" ]`,
        [
            openBrace(),
            simpleString("Да Му Еба Майката"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "codepoints from unicodes": test(
        `[ "\\u004d\\u0430\\u4e8c\\ud800\\udf02" ]`,
        //  skipRoundTripCheck: true,
        [
            openBrace(),
            simpleString("\u004d\u0430\u4e8c\ud800\udf02"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "empty object": test(
        `{ }`,
        [
            openCurly(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "missing value": test(
        `{ "foo" }`,
        [
            openCurly(),
            simpleString("foo"),
            parsingerror("missing value"),

            missing(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "foobar": test(
        `{ "foo": "bar" }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("bar"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "as is": test(
        `{ \"foo\": \"its \\\"as is\\\", \\\"yeah\", \"bar\": false }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("its \"as is\", \"yeah"),
            simpleString("bar"),
            simpleString("false"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "array": test(
        `[ "one", "two" ]`,
        [
            openBrace(),
            simpleString("one"),
            simpleString("two"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "array fu": test(
        `[ "foo", "bar", "baz", true, false, null, { "key": "simple string" }, [ null, null, null, [ ] ], " \\\\ " ]`,
        [
            openBrace(),
            simpleString("foo"),
            simpleString("bar"),
            simpleString("baz"),
            simpleString("true"),
            simpleString("false"),
            simpleString("null"),
            openCurly(),
            simpleString("key"),
            simpleString("simple string"),
            closeObject(),
            openBrace(),
            simpleString("null"),
            simpleString("null"),
            simpleString("null"),
            openBrace(),
            closeArray(),
            closeArray(),
            simpleString(" \\ "),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "simple exp": test(
        `[ 10e-01 ]`,
        [
            openBrace(),
            simpleString("10e-01"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "nested": test(
        `{ "a": test( "b": "c" } }`,
        [
            openCurly(),
            simpleString("a"),
            openCurly(),
            simpleString("b"),
            simpleString("c"),
            closeObject(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
        //formattedText: ' { "a": test( "b": "c" } }',
    ),
    "nested array": test(
        `{ "a": [ "b", "c" ] }`,
        [
            openCurly(),
            simpleString("a"),
            openBrace(),
            simpleString("b"),
            simpleString("c"),
            closeArray(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "array of objs": test(
        `[\n { "a": "b" }, { "c": "d" } ]`,
        //   formattedText: '[\n    { "a": "b" },\n    { "c": "d" }\n]',
        [
            openBrace(),
            openCurly(),
            simpleString("a"),
            simpleString("b"),
            closeObject(),
            openCurly(),
            simpleString("c"),
            simpleString("d"),
            closeObject(),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "two keys": test(
        `{ "a": "b", "c": "d" }`,
        [
            openCurly(),
            simpleString("a"),
            simpleString("b"),
            simpleString("c"),
            simpleString("d"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "key true": test(
        `{ "foo": true, "bar": false, "baz": null }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("true"),
            simpleString("bar"),
            simpleString("false"),
            simpleString("baz"),
            simpleString("null"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "obj strange strings": test(
        `{ "foo": "bar and all\\\"", "bar": "its \\\"nice\\\"" }`,
        [
            openCurly(),
            simpleString("foo"),
            simpleString("bar and all\""),
            simpleString("bar"),
            simpleString("its \"nice\""),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "bad foo bar": test(
        `[ "foo", "bar"`,
        [
            openBrace(),
            simpleString("foo"),
            simpleString("bar"),
            parsingerror('unexpected end of text, still in array'),
            streamEnd(),
        ],
    ),
    "string invalid escape": test(
        `[ "and you can\'t escape thi\s" ]`,
        [
            openBrace(),
            simpleString("and you can\'t escape this"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "nuts and bolts": test(
        `{ "boolean, true": true, "boolean, false": false, "null": null }`,
        [
            openCurly(),
            simpleString("boolean, true"),
            simpleString("true"),
            simpleString("boolean, false"),
            simpleString("false"),
            simpleString("null"),
            simpleString("null"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "frekin string": test(
        `[ "\\\\\\"\\"a\\"" ]`,
        [
            openBrace(),
            simpleString("\\\"\"a\""),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "array of string insanity": test(
        `[ "\\\"and this string has an escape at the beginning", "and this string has no escapes" ]`,
        [
            openBrace(),
            simpleString("\"and this string has an escape at the beginning"),
            simpleString("and this string has no escapes"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "non utf8": test(
        `{"CoreletAPIVersion":2,"CoreletType":"standalone","documentation":"A corelet that provides the capability to upload a folder’s contents into a user’s locker.","functions":[{"documentation":"Displays a dialog box that allows user to select a folder on the local system.","name":"ShowBrowseDialog","parameters":[{"documentation":"The callback function for results.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Uploads all mp3 files in the folder provided.","name":"UploadFolder","parameters":[{"documentation":"The path to upload mp3 files from.","name":"path","required":true,"type":"string"},{"documentation": "The callback function for progress.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Returns the server name to the current locker service.","name":"GetLockerService","parameters":[]},{"documentation":"Changes the name of the locker service.","name":"SetLockerService","parameters":[{"documentation":"The value of the locker service to set active.","name":"LockerService","required":true,"type":"string"}]},{"documentation":"Downloads locker files to the suggested folder.","name":"DownloadFile","parameters":[{"documentation":"The origin path of the locker file.","name":"path","required":true,"type":"string"},{"documentation":"The Window destination path of the locker file.","name":"destination","required":true,"type":"integer"},{"documentation":"The callback function for progress.","name":"callback","required":true,"type":"callback"}]}],"name":"LockerUploader","version":{"major":0,"micro":1,"minor":0},"versionString":"0.0.1"}`,
        [
            openCurly(),
            simpleString("CoreletAPIVersion"),
            simpleString("2"),
            simpleString("CoreletType"),
            simpleString("standalone"),
            simpleString("documentation"),
            simpleString("A corelet that provides the capability to upload a folder’s contents into a user’s locker."),
            simpleString("functions"),
            openBrace(),
            openCurly(),
            simpleString("documentation"),
            simpleString("Displays a dialog box that allows user to select a folder on the local system."),
            simpleString("name"),
            simpleString("ShowBrowseDialog"),
            simpleString("parameters"),
            openBrace(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The callback function for results."),
            simpleString("name"),
            simpleString("callback"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("callback"),
            closeObject(),
            closeArray(),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("Uploads all mp3 files in the folder provided."),
            simpleString("name"),
            simpleString("UploadFolder"),
            simpleString("parameters"),
            openBrace(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The path to upload mp3 files from."),
            simpleString("name"),
            simpleString("path"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("string"),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The callback function for progress."),
            simpleString("name"),
            simpleString("callback"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("callback"),
            closeObject(),
            closeArray(),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("Returns the server name to the current locker service."),
            simpleString("name"),
            simpleString("GetLockerService"),
            simpleString("parameters"),
            openBrace(),
            closeArray(),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("Changes the name of the locker service."),
            simpleString("name"),
            simpleString("SetLockerService"),
            simpleString("parameters"),
            openBrace(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The value of the locker service to set active."),
            simpleString("name"),
            simpleString("LockerService"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("string"),
            closeObject(),
            closeArray(),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("Downloads locker files to the suggested folder."),
            simpleString("name"),
            simpleString("DownloadFile"),
            simpleString("parameters"),
            openBrace(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The origin path of the locker file."),
            simpleString("name"),
            simpleString("path"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("string"),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The Window destination path of the locker file."),
            simpleString("name"),
            simpleString("destination"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("integer"),
            closeObject(),
            openCurly(),
            simpleString("documentation"),
            simpleString("The callback function for progress."),
            simpleString("name"),
            simpleString("callback"),
            simpleString("required"),
            simpleString("true"),
            simpleString("type"),
            simpleString("callback"),
            closeObject(),
            closeArray(),
            closeObject(),
            closeArray(),
            simpleString("name"),
            simpleString("LockerUploader"),
            simpleString("version"),
            openCurly(),
            simpleString("major"),
            simpleString("0"),
            simpleString("micro"),
            simpleString("1"),
            simpleString("minor"),
            simpleString("0"),
            closeObject(),
            simpleString("versionString"),
            simpleString("0.0.1"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
        //  formattedText: '{ "CoreletAPIVersion": 2, "CoreletType": "standalone", "documentation": "A corelet that provides the capability to upload a folder’s contents into a user’s locker.", "functions": [ { "documentation": "Displays a dialog box that allows user to select a folder on the local system.", "name": "ShowBrowseDialog", "parameters": [ { "documentation": "The callback function for results.", "name": "callback", "required": true, "type": "callback" } ] }, { "documentation": "Uploads all mp3 files in the folder provided.", "name": "UploadFolder", "parameters": [ { "documentation": "The path to upload mp3 files from.", "name": "path", "required": true, "type": "string" }, { "documentation": "The callback function for progress.", "name": "callback", "required": true, "type": "callback" } ] }, { "documentation": "Returns the server name to the current locker service.", "name": "GetLockerService", "parameters": [ ] }, { "documentation": "Changes the name of the locker service.", "name": "SetLockerService", "parameters": [ { "documentation": "The value of the locker service to set active.", "name": "LockerService", "required": true, "type": "string" } ] }, { "documentation": "Downloads locker files to the suggested folder.", "name": "DownloadFile", "parameters": [ { "documentation": "The origin path of the locker file.", "name": "path", "required": true, "type": "string" }, { "documentation": "The Window destination path of the locker file.", "name": "destination", "required": true, "type": "integer" }, { "documentation": "The callback function for progress.", "name": "callback", "required": true, "type": "callback" } ] } ], "name": "LockerUploader", "version": test( "major": 0, "micro": 1, "minor": 0 }, "versionString": "0.0.1" }',
    ),
    "array of arrays": test(
        `[ [ [ [ "foo" ] ] ] ]`,
        [
            openBrace(),
            openBrace(),
            openBrace(),
            openBrace(),
            simpleString("foo"),
            closeArray(),
            closeArray(),
            closeArray(),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "low overflow": test(
        `[ -9223372036854775808 ]`,
        //     chunks: [
        //     '[ -92233720',
        //     '36854775808 ]',
        // ],
        [
            openBrace(),
            simpleString("-9223372036854775808"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "high overflow": test(
        `[ 9223372036854775808 ]`,
        [
            openBrace(),
            simpleString("9223372036854775808"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "floats": test(
        `[ 0.1e2, 1e1, 3.141569, 10000000000000e-10 ]`,
        [
            openBrace(),
            simpleString("0.1e2"),
            simpleString("1e1"),
            simpleString("3.141569"),
            simpleString("10000000000000e-10"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "numbers game": test(
        `[ 1, 0, -1, -0.3, 0.3, 1343.32, 3345, 3.1e124, 9223372036854775807, -9223372036854775807, 0.1e2, 1e1, 3.141569, 10000000000000e-10, 0.00011999999999999999, 6E-06, 6E-06, 1E-06, 1E-06, "2009-10-20@20:38:21.539575", 9223372036854775808, 123456789, -123456789, 2147483647, -2147483647 ]`,
        [
            openBrace(),
            simpleString("1"),
            simpleString("0"),
            simpleString("-1"),
            simpleString("-0.3"),
            simpleString("0.3"),
            simpleString("1343.32"),
            simpleString("3345"),
            simpleString("3.1e124"),
            simpleString("9223372036854775807"),
            simpleString("-9223372036854775807"),
            simpleString("0.1e2"),
            simpleString("1e1"),
            simpleString("3.141569"),
            simpleString("10000000000000e-10"),
            simpleString("0.00011999999999999999"),
            simpleString("6E-06"),
            simpleString("6E-06"),
            simpleString("1E-06"),
            simpleString("1E-06"),
            simpleString("2009-10-20@20:38:21.539575"),
            simpleString("9223372036854775808"),
            simpleString("123456789"),
            simpleString("-123456789"),
            simpleString("2147483647"),
            simpleString("-2147483647"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "johnsmith": test(
        `{ "firstName": "John", "lastName": "Smith", "age": 25, "address": test( "streetAddress": "21 2nd Street", "city": "New York", "state": "NY", "postalCode": "10021" }, "phoneNumber": [ { "type": "home", "simple string": "212 555-1234" }, { "type": "fax", "simple string": "646 555-4567" } ] }`,
        [
            openCurly(),
            simpleString("firstName"),
            simpleString("John"),
            simpleString("lastName"),
            simpleString("Smith"),
            simpleString("age"),
            simpleString("25"),
            simpleString("address"),
            openCurly(),
            simpleString("streetAddress"),
            simpleString("21 2nd Street"),
            simpleString("city"),
            simpleString("New York"),
            simpleString("state"),
            simpleString("NY"),
            simpleString("postalCode"),
            simpleString("10021"),
            closeObject(),
            simpleString("phoneNumber"),
            openBrace(),
            openCurly(),
            simpleString("type"),
            simpleString("home"),
            simpleString("simple string"),
            simpleString("212 555-1234"),
            closeObject(),
            openCurly(),
            simpleString("type"),
            simpleString("fax"),
            simpleString("simple string"),
            simpleString("646 555-4567"),
            closeObject(),
            closeArray(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "array null": test(
        `[ null, false, true ]`,
        // chunks: [
        // '[ nu',
        // 'll, ',
        // 'fa',
        // 'lse, ',
        // 'tr',
        // 'ue ]'],
        [
            openBrace(),
            simpleString("null"),
            simpleString("false"),
            simpleString("true"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "empty array comma": test(
        `{ "a": [ ], "c": test( }, "b": true }`,
        [
            openCurly(),
            simpleString("a"),
            openBrace(),
            closeArray(),
            simpleString("c"),
            openCurly(),
            closeObject(),
            simpleString("b"),
            simpleString("true"),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "incomplete json terminates ending in number": test(
        `[ [ 1, 2, 3 ], [ 42, 0`,
        [
            openBrace(),
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            simpleString("3"),
            closeArray(),
            openBrace(),
            simpleString("42"),
            simpleString("0"),
            parsingerror("unexpected end of text, still in array"),
            streamEnd(),
        ],
    ),
    "incomplete json terminates ending in comma": test(
        `[ [ 1, 2, 42 ],`,
        [
            openBrace(),
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            simpleString("42"),
            closeArray(),
            parsingerror("unexpected end of text, still in array"),
            streamEnd(),
        ],
    ),
    "json org": test(
        `{\r\n                    "glossary": test(\n                            "title": "example glossary",\n\r            \t\t"GlossDiv": test(\r\n                                    "title": "S",\r\n            \t\t\t"GlossList": test(\r\n                                            "GlossEntry": test(\r\n                                                    "ID": "SGML",\r\n            \t\t\t\t\t"SortAs": "SGML",\r\n            \t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",\r\n            \t\t\t\t\t"Acronym": "SGML",\r\n            \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n            \t\t\t\t\t"GlossDef": test(\r\n                                                            "para": "A meta-markup language, used to create markup languages such as DocBook.",\r\n            \t\t\t\t\t\t"GlossSeeAlso": [ "GML", "XML" ]\r\n                                                ),\r\n            \t\t\t\t\t"GlossSee": "markup"\r\n                                            }\r\n                                    }\r\n                            }\r\n                    }\r\n            }\r\n`,
        // formattedText: '{\n    "glossary": test(\n        "title": "example glossary",\n        "GlossDiv": test(\n            "title": "S",\n            "GlossList": test(\n                "GlossEntry": test(\n                    "ID": "SGML",\n                    "SortAs": "SGML",\n                    "GlossTerm": "Standard Generalized Markup Language",\n                    "Acronym": "SGML",\n                    "Abbrev": "ISO 8879:1986",\n                    "GlossDef": test(\n                        "para": "A meta-markup language, used to create markup languages such as DocBook.",\n                        "GlossSeeAlso": [ "GML", "XML" ]\n                ),\n                    "GlossSee": "markup"\n                }\n            }\n        }\n    }\n}\n',
        // skipRoundTripCheck: true,
        [
            openCurly(),
            simpleString("glossary"),
            openCurly(),
            simpleString("title"),
            simpleString("example glossary"),
            simpleString("GlossDiv"),
            openCurly(),
            simpleString("title"),
            simpleString("S"),
            simpleString("GlossList"),
            openCurly(),
            simpleString("GlossEntry"),
            openCurly(),
            simpleString("ID"),
            simpleString("SGML"),
            simpleString("SortAs"),
            simpleString("SGML"),
            simpleString("GlossTerm"),
            simpleString("Standard Generalized Markup Language"),
            simpleString("Acronym"),
            simpleString("SGML"),
            simpleString("Abbrev"),
            simpleString("ISO 8879:1986"),
            simpleString("GlossDef"),
            openCurly(),
            simpleString("para"),
            simpleString("A meta-markup language, used to create markup languages such as DocBook."),
            simpleString("GlossSeeAlso"),
            openBrace(),
            simpleString("GML"),
            simpleString("XML"),
            closeArray(),
            closeObject(),
            simpleString("GlossSee"),
            simpleString("markup"),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "string chunk span": test(
        `[ "L\'OrÃ©al", "LÃ©\'Oral", "Ã©alL\'Or" ]`,
        // chunks: [
        // '[ "L\'OrÃ',
        // '©al", "LÃ©\'Oral", "Ã©alL\'Or" ]'],
        [
            openBrace(),
            simpleString("L\'OrÃ©al"),
            simpleString("LÃ©\'Oral"),
            simpleString("Ã©alL\'Or"),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: apostrophe string": test(
        `'a string'`,
        [
            simpleString("a string"),
            //["validationerror", "invalid string, should start with'\"' in strict JSON"],
            treeEnd(),
            streamEnd(),
        ],
    ),
    "quoted string with newline": test(
        `"a\n`,
        // skipRoundTripCheck: true,
        [
            parsingerror("unterminated string"),
            simpleString("a"),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: trailing comma": test(
        `[ 1, 2, ]`,
        [
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            closeArray(),
            //["validationerror", "trailing commas are not allowed"],
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: block comment": test(
        `[ 1, 2 /*a comment\n*/ ]`,
        [
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            //["token", "blockcomment", "a comment\n", null],
            //["validationerror", "block comments are not allowed in strict JSON"],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension parens instead of braces": test(
        `( "a": "foo" )`,
        [
            openCurly(),
            //["validationerror", "objects should start with '{' in strict JSON"],
            simpleString("a"),
            simpleString("foo"),
            closeObject(),
            //["validationerror", "objects should end with '}' in strict JSON"],
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension missing comma": test(
        `[ "foo" "bar" ]`,
        [
            openBrace(),
            simpleString("foo"),
            simpleString("bar"),
            //["validationerror", "commas are required between elements in strict JSON"],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: angle brackets instead of brackets": test(
        `< "foo" >`,
        [
            openAngleBracket(),
            //["validationerror", "arrays should start with '[' in strict JSON"],
            simpleString("foo"),
            closeArray(),
            //["validationerror", "arrays should end with ']' in strict JSON"],
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: single line comment": test(
        `[ 1, 2 //a comment\n]`,
        // skipRoundTripCheck: true,
        [
            openBrace(),
            simpleString("1"),
            simpleString("2"),
            //["token", "linecomment", "a comment", null],
            //["validationerror", "line comments are not allowed in strict JSON"],
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: tagged union": test(
        `| "foo" "x"`,
        [
            openTaggedUnion(),
            //["validationerror", "tagged unions are not allowed in strict JSON"],
            simpleString("foo"),
            simpleString("x"),
            //["closetaggedunion"],
            taggedUnionEnd(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "forbidden extension: schema": test(
        `!"foo" { }`,
        [
            schemaDataStart(),
            //["validationerror", "headers are not allowed in strict JSON"],
            simpleString("foo"),
            instanceDataStart(),
            openCurly(),
            closeObject(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "unclosed object": test(
        `{`,
        [
            instanceDataStart(),
            openCurly(),
            parsingerror("unexpected end of text, still in object"),
            streamEnd()
        ],
    ),
    "wrong inline formatting": test(
        `[ "",\n""]`,
        // formattedText: '[ "", "" ]',
        [
            instanceDataStart(),
            openBrace(),
            simpleString(""),
            simpleString(""),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "wrong block formatting": test(
        `[ \n"",""]`,
        // formattedText: '[\n    "",\n    "" ]',
        [
            instanceDataStart(),
            openBrace(),
            simpleString(""),
            simpleString(""),
            closeArray(),
            treeEnd(),
            streamEnd(),
        ],
    ),
    "trailing whitespace": test(
        `"foo" `,
        // formattedText: '"foo" ',
        [
            instanceDataStart(),
            simpleString("foo"),
            treeEnd(),
            streamEnd(),
        ],
    ),
})