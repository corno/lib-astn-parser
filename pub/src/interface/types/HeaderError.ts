
export type HeaderError =
| ["expected the schema start (!) or root value", {}]
| ["expected an embedded schema", {}]
| ["expected a schema reference or an embedded schema", {}]
| ["expected a schema schema reference", {}]
