
export type THeaderError =
| ["expected the schema start (!) or root value", null]
| ["expected an embedded schema", null]
| ["expected a schema reference or an embedded schema", null]
| ["expected a schema schema reference", null]
